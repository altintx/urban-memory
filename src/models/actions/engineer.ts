import { Translatable } from "../../utility/strings";
import { Action, Cooldown } from "../action";
import { distanceBetween } from "../map/map";
import { Tile } from "../map/tile";
import { Mission } from "../missions/mission";

export const LAUNCH_DRONE: Action = {
    "name": new Translatable({
        "en": "Launch drone",
        "de": "Drohne starten",
        "fr": "Lancer le drone",
        "es": "Lanzar dron",
        "ru": "Запустить дрон",
        "pl": "Uruchom drona",
        "zh-cn": "发射无人机",
        "zh-tw": "發射無人機",
        "ja": "ドローンを発射",
        "ko": "드론 발사",
        "nl": "Droon lanceren",
        "pt": "Lançar drone",
        "vi": "Bắn drone",
        "tr": "İHA fırlat",
        "ht": "Lanse dron",
        "it": "Lancia drone"
    }),
    "description": new Translatable({
        "en": "Launch a drone. Creates an extra source of visibility. Can attack once. Fuel to be airborne for five turns.",
        "de": "Starte eine Drohne. Erstellt eine zusätzliche Sichtquelle. Kann einmal angreifen. Benötigt Treibstoff für fünf Runden.",
        "fr": "Lance un drone. Crée une source supplémentaire de visibilité. Peut attaquer une fois. Consomme de l'essence pour voler pendant cinq tours.",
        "es": "Lanza un dron. Crea una fuente adicional de visibilidad. Puede atacar una vez. Combustible para volar durante cinco turnos.",
        "ru": "Запустить дрон. Создает дополнительный источник видимости. Может атаковать один раз. Топливо для полета в течение пяти ходов.",
        "pl": "Uruchom drona. Tworzy dodatkową źródło widoczności. Może atakować raz. Paliwo do lotu przez pięć tur.",
        "zh-cn": "发射无人机。创建额外的可见性来源。可以攻击一次。燃料为飞行五个回合。",
        "zh-tw": "發射無人機。創建額外的可見性來源。可以攻擊一次。燃料為飛行五個回合。",
        "ja": "ドローンを発射します。追加の視界を作成します。一度だけ攻撃できます。飛行するために燃料を5ターン消費します。",
        "ko": "드론을 발사합니다. 추가적인 시야를 생성합니다. 한 번 공격할 수 있습니다. 다섯 턴 동안 비행하는 데 연료가 필요합니다.",
        "nl": "Lanceer een drone. Creëert een extra zichtbron. Kan een keer aanvallen. Brandstof om vijf beurten in de lucht te blijven.",
        "pt": "Lance um drone. Cria uma fonte extra de visibilidade. Pode atacar uma vez. Combustível para voar por cinco turnos.",
        "vi": "Bắn một chiếc drone. Tạo ra một nguồn nhìn thêm. Có thể tấn công một lần. Nhiên liệu để bay trong vòng năm lượt.",
        "tr": "İHA fırlat. Ek bir görüş kaynağı oluşturur. ",
        "ht": "Lanse yon dron. Kreye yon sòs ekstra pou vizibilite. Ka atake yon fwa. Esans pou volè pou cinq tounen.",
        "it": "Lancia un drone. Crea una fonte extra di visibilità. Può attaccare una volta. Carburante per volare per cinque turni."
    }),
    "ap": 2,
    "xp": 10,
    "cooldown": 5,
    "count": 2,
    uuid: "6ac22549-a273-437a-b7b6-ab3aa9cd9bdb",
    hasSecondarySelection: false,
    available(source: any, target: any, action: Action, mission: Mission) {
        return true;
    }
};
export const DIG_EMBANKMENT: Action = {
    "name": new Translatable({
        "en": "Dig Embankment",
        "de": "Befestigung graben",
        "fr": "Creuser un remblai",
        "es": "Excavar un terraplén",
        "ru": "Рыть берму",
        "pl": "Wykop dywan",
        "zh-cn": "挖堤坝"
    }),
    "description": new Translatable({
        "en": "Dig an embankment. Creates a wall of earth that partially blocks line of sight and movement. Can be destroyed by explosives.",
        "de": "Grabt eine Befestigung. Erstellt eine Mauer aus Erde, die teilweise die Sicht und Bewegung blockiert. Kann durch Sprengstoffe zerstört werden.",
        "fr": "Creuse un remblai. Crée un mur de terre qui bloque partiellement la ligne de vue et le mouvement. Peut être détruit par des explosifs.",
        "es": "Excava un terraplén. Crea una pared de tierra que bloquea parcialmente la línea de visión y el movimiento. Puede ser destruido por explosivos.",
        "ru": "Рыть берму. Создает стену земли, которая частично блокирует видимость и движение. Может быть уничтожен взрывчаткой.",
        "pl": "Wykop dywan. Tworzy ścianę ziemi, która częściowo blokuje linię wzroku i ruch. Może zostać zniszczony przez wybuchowe.",
        "zh-cn": "挖堤坝。创建一堵土墙，部分阻挡视线和移动。可以用炸药炸毁。"
    }),
    "hasSecondarySelection": true,
    "ap": 1,
    "xp": 20,
    available(source: Tile, destination: Tile, action: Action, mission: Mission): boolean {
        return distanceBetween(mission.map, source, destination) === 1;
    },
    cooldown: Cooldown.None,
    uuid: "d43890c2-23b2-430b-9f0c-4723564b91ce"
}