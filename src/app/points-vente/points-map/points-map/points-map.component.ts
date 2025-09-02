import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as L from 'leaflet';

type GovCode =
  | 'tunis' | 'ariana' | 'ben-arous' | 'manouba' | 'nabeul' | 'zaghouan' | 'bizerte' | 'beja' | 'jendouba'
  | 'kef' | 'siliana' | 'sousse' | 'monastir' | 'mahdia' | 'sfax' | 'kairouan' | 'kasserine' | 'sidi-bouzid'
  | 'gafsa' | 'tozeur' | 'kebili' | 'gabes' | 'medenine' | 'tataouine';

interface PosDetails {
  id: string;
  activity: string;
  region: string;
  address: string;
}

const GOV_META: Record<string, { code: GovCode; name_ar: string; name_fr: string }> = {
  'Tunis': { code: 'tunis', name_ar: 'تونس', name_fr: 'Tunis' },
  'Ben Arous': { code: 'ben-arous', name_ar: 'بن عروس', name_fr: 'Ben Arous' },
  'El Kef': { code: 'kef', name_ar: 'الكاف', name_fr: 'Le Kef' },
  'Sousse': { code: 'sousse', name_ar: 'سوسة', name_fr: 'Sousse' },
  'Sfax': { code: 'sfax', name_ar: 'صفاقس', name_fr: 'Sfax' },
  'Jendouba': { code: 'jendouba', name_ar: 'جندوبة', name_fr: 'Jendouba' },
  'Kairouan': { code: 'kairouan', name_ar: 'القيروان', name_fr: 'Kairouan' },
  'Kasserine': { code: 'kasserine', name_ar: 'القصرين', name_fr: 'Kasserine' },
  'Mahdia': { code: 'mahdia', name_ar: 'المهدية', name_fr: 'Mahdia' },
  'Manouba': { code: 'manouba', name_ar: 'منوبة', name_fr: 'Manouba' },
  'Sidi Bouzid': { code: 'sidi-bouzid', name_ar: 'سيدي بوزيد', name_fr: 'Sidi Bouzid' },
  'Kébili': { code: 'kebili', name_ar: 'قبلي', name_fr: 'Kébili' },
  'Béja': { code: 'beja', name_ar: 'باجة', name_fr: 'Béja' },
  'Tataouine': { code: 'tatouine', name_ar: 'تطاوين', name_fr: 'Tataouine' },
  'Gabès': { code: 'gabes', name_ar: 'قابس', name_fr: 'Gabès' },
  'Bizerte': { code: 'bizerte', name_ar: 'بنزرت', name_fr: 'Bizerte' },
  'Ariana': { code: 'ariana', name_ar: 'أريانة', name_fr: 'Ariana' },
  'Nabeul': { code: 'nabeul', name_ar: 'نابل', name_fr: 'Nabeul' },
  'Monastir': { code: 'monastir', name_ar: 'المنستير', name_fr: 'Monastir' },
  'Siliana': { code: 'siliana', name_ar: 'سليانة', name_fr: 'Siliana' },
  'Zaghouan': { code: 'zaghouan', name_ar: 'زغوان', name_fr: 'Zaghouan' },
  'Gafsa': { code: 'gafsa', name_ar: 'قفصة', name_fr: 'Gafsa' },
  'Médenine': { code: 'medenine', name_ar: 'مدنين', name_fr: 'Médenine' },
  'Tozeur': { code: 'tozeur', name_ar: 'توزر', name_fr: 'Tozeur' },
};

const MOCK_DETAILS: Record<GovCode, PosDetails> = Object.values(GOV_META).reduce(
  (acc, meta) => {
    acc[meta.code] = {
      id: 'N/A',
      activity: 'N/A',
      region: meta.name_ar,
      address: 'N/A',
    };
    return acc;
  },
  {} as Record<GovCode, PosDetails>
);

MOCK_DETAILS['kairouan'] = {
  id: '08/0018',
  activity: 'حلاق',
  region: 'القيروان',
  address: '4 نهج اللمسن، القيروان',
};

MOCK_DETAILS['sidi-bouzid'] = {
  id: '12/0451',
  activity: 'مكتبة',
  region: 'سيدي بوزيد',
  address: 'نهج الحبيب بورقيبة، سيدي بوزيد',
};

@Component({
  selector: 'app-points-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './points-map.component.html',
  styleUrls: ['./points-map.component.scss'],
})
export class PointsMapComponent implements AfterViewInit {

  /** chemin du geojson (optionnel si tu veux passer un autre fichier) */
  @Input() geojsonUrl = '/assets/geoBoundaries-TUN-ADM1.geojson';

  private map!: L.Map;
  private geoLayer!: L.GeoJSON;

  // Détails mock (clé = code gov). À remplacer par tes données réelles.
  detailsByGov: Record<GovCode, PosDetails> = MOCK_DETAILS;

  selectedGovCode: GovCode | null = null;
  selectedGovNameAr = '';
  selectedDetails: PosDetails | null = null;

  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadGeojson();
  }

  private initMap() {
    this.map = L.map('tn-map', {
      center: [34.5, 10.3],   // centre de la Tunisie
      zoom: 6,
      minZoom: 5,
      maxZoom: 11,
      zoomControl: false,
      attributionControl: false,
    });

    // Couche fond sombre neutre (optionnelle)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0, // invisible → on ne garde que le canevas leaflet
    }).addTo(this.map);
  }

  private loadGeojson() {
    this.http.get(this.geojsonUrl).subscribe({
      next: (data: any) => {
        if (data?.features) {
          data.features.forEach((f: any) => {
            const meta = GOV_META[f.properties?.shapeName];
            if (meta) {
              f.properties = {
                ...f.properties,
                code: meta.code,
                name_ar: meta.name_ar,
                name_fr: meta.name_fr,
              };
            }
          });
        }

        this.geoLayer = L.geoJSON(data, {
          style: () => ({
            color: '#ffffff',        // contour
            weight: 1,
            fillColor: '#ef4444',    // rouge
            fillOpacity: 0.85
          }),
          onEachFeature: (feature, layer) => this.bindFeatureEvents(feature, layer as L.Path)
        }).addTo(this.map);

        // Ajuste la vue aux limites de la Tunisie
        this.map.fitBounds(this.geoLayer.getBounds(), { padding: [10, 10] });
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger la carte (GeoJSON). Vérifie le chemin.';
        this.loading = false;
      }
    });
  }

  private bindFeatureEvents(feature: any, layer: L.Path) {
    const props = feature.properties || {};
    const rawCode = (props.code || '').toLowerCase();
    if (!rawCode) { return; }
    const code = rawCode as GovCode;
    const nameAr: string = props.name_ar || code;

    // Tooltip au survol (style custom via CSS .gov-tooltip)
    (layer as any).bindTooltip(nameAr, {
      direction: 'center',
      permanent: false,
      sticky: true,
      className: 'gov-tooltip'
    });

    layer.on('mouseover', () => {
      layer.setStyle({ fillColor: '#ff6b5e', fillOpacity: 0.95, weight: 2 });
    });
    layer.on('mouseout', () => {
      if (this.selectedGovCode === code) {
        // style “sélectionné”
        layer.setStyle({ fillColor: '#ff3c1a', fillOpacity: 0.98, weight: 2 });
      } else {
        // style normal
        layer.setStyle({ fillColor: '#ef4444', fillOpacity: 0.85, weight: 1 });
      }
    });
    layer.on('click', () => {
      this.onSelectGov(code, nameAr);
      // Mets à jour le style de toutes les couches (sélection unique)
      this.geoLayer.eachLayer((l: any) => {
        l.setStyle({ fillColor: '#ef4444', fillOpacity: 0.85, weight: 1 });
      });
      layer.setStyle({ fillColor: '#ff3c1a', fillOpacity: 0.98, weight: 2 });
    });
  }

  private onSelectGov(code: GovCode, nameAr: string) {
    this.selectedGovCode = code;
    this.selectedGovNameAr = nameAr;
    this.selectedDetails = this.detailsByGov[code] ?? null;
  }

  clearSelection() {
    this.selectedGovCode = null;
    this.selectedGovNameAr = '';
    this.selectedDetails = null;
    if (this.geoLayer) {
      this.geoLayer.eachLayer((l: any) =>
        l.setStyle({ fillColor: '#ef4444', fillOpacity: 0.85, weight: 1 })
      );
    }
  }
}
