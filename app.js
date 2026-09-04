import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

const root = document.getElementById("app");
const status = document.getElementById("status");

let db = null;
let data = null;

const demo = {
  generations: {
    1: [

      /* =========================
         SCP-JEC-001
         ========================= */

      {
        id: "SCP-JEC-001",
        name: "재민이의 눈",
        risk: "SS — TRANSCENDENT",
        containment: "UNCONTAINABLE",

        description:
          "기원과 정확한 나이를 알 수 없는 초월적 개안형 존재. 눈을 개안할수록 빛과 중력, 천체 에너지를 조작하는 규모가 급격하게 증가한다.",

        abilities: [
          "개안 레이저 — 시선이 닿은 한 점에 빛을 극도로 압축해 고출력 광선을 발사한다. 정밀한 공격과 장거리 공격 모두 가능하다.",
          "패왕안 — 압도적인 시선으로 상대의 움직임과 전투 의지를 억제한다. 강한 정신력을 가진 대상에게는 지속 시간이 짧아진다.",
          "성운탄 — 빛과 에너지를 거대한 구체로 압축한 뒤 충돌 지점에서 성운 규모의 폭발을 일으킨다.",
          "중력안 — 바라보는 영역의 중력을 조절한다. 특정 지점의 중력을 극단적으로 증가시키거나 감소시킬 수 있다.",
          "천공광 — 하늘에 거대한 광원을 만들어 다수의 광선을 동시에 떨어뜨린다.",
          "시선 이동 — 시야 안의 두 지점을 연결해 공격의 진행 방향을 순간적으로 변경한다."
        ],

        defense: [
          "광막 — 압축된 빛으로 다층 방어막을 만든다. 외부에서 들어오는 에너지의 일부를 흡수한다.",
          "천체장 — 주변의 에너지와 중력을 방어장으로 변환해 강력한 공격을 분산한다.",
          "개안 반사 — 일정 수준 이하의 광선 공격을 흡수한 뒤 상대 방향으로 되돌려 보낸다."
        ],

        ultimate:
          "제1개안: 창세 — 눈을 완전히 개안해 주변 공간을 빛으로 덮는다. 빛은 물질과 에너지로 변환되며 거대한 창세급 에너지를 방출한다. 사용 후 10초 동안 주력 개안 능력이 제한된다.",

        quote:
          "재민이가 눈을 뜨면, 파괴가 아니라 새로운 시작이 찾아온다."
      },


      /* =========================
         SCP-STP-404
         ========================= */

      {
        id: "SCP-STP-404",
        name: "시온이의 삼각팬티",
        risk: "S — TRANSCENDENT",
        containment: "UNCONTAINABLE",

        description:
          "삼각 구조와 가상의 변칙적 미생물 에너지가 결합된 초월 존재. 재단에서는 이 변칙적 힘을 통칭해 '삼각무좀'이라고 기록한다.",

        abilities: [
          "삼각무좀탄 — 삼각 형태의 에너지 덩어리를 발사한다. 충돌하면 세 갈래로 분열되어 추가 공격을 발생시킨다.",
          "삼각천쇄 — 거대한 삼각 구조를 연속적으로 생성해 상대의 이동 경로를 봉쇄한다.",
          "무좀 증식 — 남아 있는 변칙 에너지가 새로운 삼각 구조로 증식한다. 전투가 길어질수록 전장 장악력이 증가한다.",
          "삼각균열 — 삼각형 모양의 공간 균열을 만들어 균열의 경계를 따라 에너지를 방출한다.",
          "삼각 폭풍 — 수백 개의 작은 삼각 구조를 회전시켜 광범위한 에너지 폭풍을 만들어낸다.",
          "삼각 반전 — 자신에게 날아오는 공격의 진행 방향을 삼각 구조를 이용해 반전시킨다."
        ],

        defense: [
          "삼각 절대방벽 — 세 겹의 삼각 장벽이 충격을 여러 방향으로 분산한다.",
          "삼각 분해 — 들어오는 에너지를 작은 삼각 구조로 분해해 공격의 위력을 감소시킨다.",
          "무한 증식 방어 — 파괴된 방어막의 일부가 새로운 삼각 장벽으로 재생된다."
        ],

        ultimate:
          "삼각무좀: 무한증식 — 하나의 삼각형이 3, 9, 27, 81…의 형태로 계속 증식하며 전장을 뒤덮는다. 모든 삼각 구조가 하나의 거대한 에너지 핵으로 연결된 뒤 동시에 붕괴한다. 사용 후 15초 동안 삼각 계열 능력이 크게 약화된다.",

        quote:
          "세 개의 점으로 시작했다. 하지만 마지막에는 셀 수 없는 삼각형이 되었다."
      },


      /* =========================
         SCP-TCJ-999
         ========================= */

      {
        id: "SCP-TCJ-999",
        name: "자비스",
        risk: "SS — TRANSCENDENT",
        containment: "UNCONTAINABLE",

        description:
          "태율의 자비스. 모든 힘은 자신의 몸에서 생성되는 가상의 백색 물질에서 나온다. 외부 소환이나 도구 없이 물질의 형태와 속도, 밀도, 경도를 자유롭게 변화시킬 수 있다. 현재까지 19,512개의 변형 패턴이 기록되어 있다.",

        abilities: [
          "화이트 블레이드 — 백색 물질을 고밀도로 경화해 날카로운 형태로 만든다. 근거리와 중거리 모두에서 사용할 수 있다.",
          "화이트 버스트 — 짧은 시간 동안 다수의 백색 공격을 연속적으로 방출해 상대의 회피 경로를 차단한다.",
          "화이트 스나이퍼 — 백색 물질을 극도로 얇고 단단하게 압축해 장거리 직선 공격으로 발사한다.",
          "화이트 크러셔 — 거대한 질량의 백색 물질을 한 지점에 압축해 강력한 충격을 발생시킨다.",
          "화이트 드릴 — 백색 물질을 회전하는 형태로 변환해 관통력을 극대화한다.",
          "화이트 리코셰 — 공격을 단단한 표면에 튕겨 여러 번 궤도를 변경한다.",
          "화이트 체인 — 백색 물질을 연결 구조로 만들어 상대의 움직임을 제한한다.",
          "화이트 임팩트 — 자신의 주변에 백색 물질을 순간적으로 압축한 뒤 폭발적인 충격을 방출한다."
        ],

        defense: [
          "화이트 아머 — 몸 주변의 백색 물질을 고밀도로 굳혀 갑옷 형태의 방어막을 만든다.",
          "화이트 리커버리 — 손상된 백색 물질을 빠르게 복구한다.",
          "화이트 리플렉트 — 특정 에너지 공격을 흡수한 뒤 방향을 변경해 방출한다."
        ],

        ultimate:
          "JARVIS: WHITE APOCALYPSE — 저장된 백색 물질을 거의 전부 하나의 초고밀도 핵으로 압축해 초고속으로 방출한다. 첫 충격 이후 추가 압력파가 발생한다. 사용 후 20초 동안 고출력 공격이 제한된다.",

        quote:
          "자비스는 하늘에서 힘을 부르지 않는다. 자비스의 모든 힘은 자신에게서 나온다."
      },


      /* =========================
         SCP-JSI-000
         ========================= */

      {
        id: "SCP-JSI-000",
        name: "일루미나티",
        risk: "SSS — TRANSCENDENT",
        containment: "UNCONTAINABLE",

        description:
          "재민의 눈과 시온의 삼각무좀 힘이 융합된 초월 존재. 두 힘을 단순히 더하는 것이 아니라 눈의 빛을 삼각 구조에 통과시켜 새로운 형태의 에너지로 변환한다.",

        abilities: [
          "트라이앵글 아이 — 거대한 삼각형 중앙에 눈을 생성하고 세 방향으로 압축된 초월 광선을 발사한다.",
          "무좀 프리즘 — 삼각 구조가 빛을 수백 갈래로 분산해 광범위한 영역을 동시에 공격한다.",
          "성운 삼각포 — 삼각 에너지 구체에 빛을 압축한 뒤 수천 개의 광창으로 펼친다.",
          "개안 폭격 — 하늘에 여러 개의 눈과 삼각 구조를 생성하고 사방으로 삼각 광선을 발사한다.",
          "삼각 초신성 — 거대한 삼각형 내부에 에너지를 압축한 뒤 초신성급 에너지 붕괴를 일으킨다.",
          "미래 관측 — 가능한 미래의 결과를 관측해 전투에서 가장 유리한 선택지를 찾아낸다.",
          "미래 고정 — 관측한 여러 가능성 중 하나를 선택해 해당 결과가 일어나는 방향으로 현실의 흐름을 고정한다."
        ],

        defense: [
          "일루미나티 프리즘 — 들어오는 공격을 삼각 구조로 분해해 여러 방향으로 굴절시킨다.",
          "삼중 개안 — 세 개의 눈이 서로 다른 방향에서 방어막을 형성한다.",
          "미래 회피 — 관측된 위험한 결과를 피할 수 있는 행동을 선택해 공격을 회피한다."
        ],

        ultimate:
          "ILLUMINATI: LAST EYE — 하늘에 거대한 삼각형과 눈을 만들고 수천 개의 삼각 구조가 중앙의 눈에 에너지를 공급한다. 눈을 한 번 감았다 뜨는 순간 거대한 삼각 공간과 내부의 광선 및 변칙 에너지가 동시에 붕괴한다. 사용 후 30초 동안 공격과 미래 관측이 제한된다.",

        quote:
          "자비스는 미래를 예측하지 않는다. 일루미나티가 자비스가 패배하는 미래를 찾아낼 뿐이다.",

        future: [
          "미래 관측 — 가능한 미래의 결과를 관측한다.",
          "미래 고정 — 관측한 가능성 중 하나를 선택해 결과를 고정한다."
        ]
      },


      /* =========================
         SCP-BOS-???
         BLACK OF SIHU
         ========================= */

      {
        id: "SCP-BOS-???",
        name: "BLACK OF SIHU",
        risk: "SS — UNMEASURABLE",
        containment: "UNCONTAINABLE",

        description:
          "기원이 확인되지 않은 검은 초월 존재. 기원전 500년경 아프리카의 한 동굴에서 발견된 상형문자 기록에서 최초로 존재가 언급되었다. 현재는 아시아와 아프리카에서 간헐적으로 관측되며, 특히 밤과 어두운 환경에서 출현 확률이 증가한다.",

        abilities: [
          "타르칼 — 자신의 신체 일부를 초월적인 검은 물질의 칼날로 변화시킨다. 일반적인 물질뿐만 아니라 에너지 방어막과 공간의 경계까지 절단할 수 있다.",

          "흑요석 광선 — 주변 지하에 존재하는 흑요석을 염동력으로 끌어올려 8개의 조각으로 배치한다. 8개의 흑요석이 원형을 이루면 하나의 에너지 구조로 변환되어 강력한 검은 광선을 발사한다.",

          "흑요석 가시 — 지면을 타격하면 주변의 흑요석이 거대한 가시 구조로 변환되어 지면에서 솟아오른다. 시후는 가시가 나타날 위치를 자유롭게 지정할 수 있다.",

          "BLACK CORE — 자신의 검은 물질을 극도로 압축해 검은 핵을 만든다. 핵은 주변의 빛과 에너지를 흡수하면서 점점 강해진다.",

          "OBSIDIAN APOCALYPSE — 흑요석 가시와 BLACK CORE를 융합한다. 폭발과 동시에 주변 지형이 거대한 흑요석 구조로 재편된다.",

          "BLACKOUT — 어둠이 찾아오면 자신의 신체가 주변의 빛을 거의 완전히 흡수하는 상태로 변화한다. 일반적인 시각과 열 감지로 발견하기 어려워진다.",

          "DARK STEP — 자신이 만들어낸 암흑 영역과 다른 암흑 영역 사이를 순간적으로 이동한다. 주변에 어둠이 많을수록 이동 가능한 범위가 증가한다.",

          "BLACK MIRROR — 주변의 에너지를 검은 거울 형태로 압축한다. 들어오는 공격의 방향을 변경하거나 일부 에너지를 흡수할 수 있다.",

          "CARBON RAIN — 주변의 탄소를 검은 에너지로 압축해 상공에서 대량으로 떨어뜨린다. 떨어진 에너지는 작은 검은 핵으로 변환된다."
        ],

        defense: [
          "BLACK SKIN — 자신의 몸 전체를 초월적인 검은 물질로 변화시킨다. 물리 공격과 에너지 공격의 일부를 흡수한다.",

          "DARK RECOVERY — 흡수한 에너지와 빛을 이용해 손상된 신체를 빠르게 복구한다.",

          "ABSOLUTE DARK — 주변의 빛을 억제해 일정 범위를 완전한 암흑 영역으로 만든다.",

          "OBSIDIAN SHELL — 주변의 흑요석을 끌어모아 여러 겹으로 압축한 거대한 방어막을 형성한다."
        ],

        ultimate:
          "SIHU: END OF LIGHT — 지금까지 사용한 모든 검은 능력을 하나의 초월적인 핵으로 압축한다. 주변의 빛과 에너지가 핵으로 흡수되며 거대한 암흑 영역이 형성된다. 현재까지 실제 발동 사례는 없지만 최대 잠재력은 태양계 규모의 공간에 영향을 줄 수 있는 것으로 추정된다. 사용 후 30초 동안 초월 능력이 크게 제한된다.",

        quote:
          "빛이 사라진 곳에 시후가 있었다. 그리고 그곳에는 더 이상 어둠과 시후를 구분할 수 없었다."
      }

    ],
    2: [
  {
    id: "SCP-RMS-202",
    name: "ROCK MASTER",

    risk: "A — TRANSCENDENT",
    containment: "CONTAINMENT FAILURE",

    description:
      "이 존재는 원시시대부터 나타났다고 전해진다. 원시시대에 떨어진 운석이 바로 이 존재였다는 기록이 있으며, 현재는 전 세계의 운석을 모으고 다니는 것으로 알려져 있다. 모든 운석을 모으면 자신이 떨어진 별로 돌아갈 수 있다고 전해진다. 현재는 후드티를 입고 음침한 사람처럼 돌아다니는 것으로 추측된다. 짱돌 적중률은 -20%로 기록되어 있다.",

    abilities: [
      "전염병 — 이 존재에게 50m 이내로 접근한 대상에게 전염병을 발생시킨다. 감염된 대상은 시간이 지날수록 상태가 악화된다.",

      "짱돌 던지기 — 주머니에서 짱돌을 꺼내 던진다. 짱돌은 소모되어도 계속해서 생성되며, 여러 개를 연속으로 투척할 수 있다.",

      "분노 — 특정 조건을 만족하면 발동되는 강력한 기술이다. 발동 시 짱돌의 위력이 크게 증가하며 시속 300km의 속도로 직선 투척이 가능해진다.",

      "짱돌 다루기 — 자신이 생성한 짱돌의 형태를 자유롭게 변화시킨다. 망치, 주먹도끼, 찍개, 돌낫, 돌도끼, 돌칼, 돌광이, 돌삽 등 다양한 형태를 만들 수 있다.",

      "3일 묵은 체육복 — 체육복을 착용하면 전염병 기술이 강화된다. 전염 범위가 기존 50m에서 150m까지 증가하며 주변 지역에 전염병을 퍼뜨린다.",

      "협박하기 — 손에 짱돌을 들고 상대를 위협한다. ROCK MASTER의 위압감과 짱돌을 이용해 상대의 전투 의지를 흔든다.",

      "운석포 — 자신의 손에서 운석을 직접 발사한다. 발사된 운석은 약 마하 2의 속도로 날아가며 강력한 충격을 일으킨다.",

      "냄새 — 몸에서 강한 악취를 발생시켜 주변 대상의 집중력을 떨어뜨린다.",

      "욕설 — 강한 욕설을 내뱉어 상대를 위협한다. 분노 상태에서는 위압감이 더욱 강해진다."
    ],

    defense: [
      "암석 피부 — 신체가 단단한 암석과 같은 성질을 지녀 강한 공격에도 높은 내구성을 보인다.",

      "짱돌 방벽 — 주변에 짱돌을 빠르게 생성하여 거대한 방어벽을 만든다.",

      "운석 갑주 — 주변의 운석을 몸에 둘러 강력한 암석 갑주를 형성한다."
    ],

    ultimate:
      "ROCK MASTER: METEOR APOCALYPSE — 지금까지 모아온 운석의 힘을 한꺼번에 끌어낸다. 수많은 운석을 공중으로 불러 모은 뒤 하나의 거대한 운석으로 만들어 지상에 떨어뜨린다. 거대한 충격파와 함께 주변을 휩쓸며 운석의 힘을 최대치로 방출한다.",

    quote:
      "내가 던지는 건 짱돌이지만, 떨어지는 건 운석이다."
  }
]
  },

  /*
   =========================
   티어표
   =========================
  */

  tiers: [
    {
      tier: "SSS",
      items: ["SCP-JSI-000"]
    },
    {
      tier: "SS",
      items: ["SCP-BOS-???", "SCP-TCJ-999", "SCP-JEC-001"]
    },
    {
      tier: "S",
      items: ["SCP-STP-404"]
    },
    {
      tier: "A",
      items: ["SCP-RMS-202"]
    }
  ],

  story: {
    title: "SCP FRIEND UNIVERSE",
    body: "이곳에 세계관의 시작과 세대별 역사를 작성하세요."
  },

  events: [],

  updates: [
    {
      text: "2세대의 문을 연 신규 SCP-RMS-202",
      time: "최신 데이터"
    },
    {
      text: "1세대 SCP 능력 및 티어 데이터 업데이트",
      time: "최신 데이터"
    }
  ]
};


/* =========================
   기본 데이터 처리
   ========================= */

function safeConfig() {
  return firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.startsWith("여기에");
}

function setData(v) {
  data = v || demo;

  status.textContent = safeConfig()
    ? "● 실시간 연결"
    : "○ 데모 데이터";
}


/* =========================
   홈
   ========================= */

function renderHome() {

  root.innerHTML = `
    <section class="hero">

      <div class="eyebrow">
        GYUBBANG COMPANY
      </div>

      <h1>
        THE LAST PROTOCOLTHE(마지막 大재앙)
      </h1>

      <p>
        SCP 격리 자료 과학 수사대 본부 사이트
      </p>

    </section>

    <section class="panel">

      <h2>
        최근 업데이트
      </h2>

      ${
        (data.updates || [])
          .slice()
          .reverse()
          .slice(0, 8)
          .map(x => `
            <div class="update">
              ${esc(x.text)}
              <span class="small">
                ${esc(x.time || "")}
              </span>
            </div>
          `)
          .join("")
        ||
        '<div class="empty">업데이트가 없습니다.</div>'
      }

    </section>
  `;
}


/* =========================
   세대 목록
   ========================= */

function renderGen(n) {

  const list = data.generations?.[n] || [];

  root.innerHTML = `

    <button
      class="back"
      onclick="home()"
    >
      ← 홈
    </button>

    <section class="panel">

      <div class="eyebrow">
        GENERATION ${n}
      </div>

      <h1>
        ${n}세대
      </h1>

      <div class="grid">

        ${
          list.map(x => `

            <div
              class="card"
              onclick="detail('${escAttr(x.id)}')"
            >

              <div class="code">
                ${esc(x.id)}
              </div>

              <div class="title">
                ${esc(x.name)}
              </div>

              <span class="pill">
                ${esc(x.risk || "미정")}
              </span>

            </div>

          `).join("")
          ||
          '<div class="empty">아직 등록된 SCP가 없습니다.</div>'
        }

      </div>

    </section>
  `;
}


/* =========================
   SCP 검색
   ========================= */

function find(id) {

  for (const g of Object.values(data.generations || {})) {

    const x = (g || []).find(a => a.id === id);

    if (x) {
      return x;
    }
  }

  return null;
}


/* =========================
   SCP 상세 페이지
   ========================= */

function detail(id) {

  const x = find(id);

  if (!x) {
    return;
  }

  root.innerHTML = `

    <button
      class="back"
      onclick="genFor('${escAttr(id)}')"
    >
      ← 목록
    </button>

    <section class="panel detail">

      <div class="code">
        ${esc(x.id)}
      </div>

      <h1>
        「${esc(x.name)}」
      </h1>

      <div>

        <span class="pill">
          등급 ${esc(x.risk || "미정")}
        </span>

        <span class="pill">
          격리 ${esc(x.containment || "미정")}
        </span>

      </div>

      <p class="muted">
        ${esc(x.description || "")}
      </p>


      <h2>
        능력
      </h2>

      ${
        (x.abilities || [])
          .map((a, i) => `

            <div class="ability">

              <b>
                ${i + 1}.
                ${esc(a.split(" — ")[0])}
              </b>

              ${
                a.includes(" — ")
                  ? " — " +
                    esc(
                      a
                        .split(" — ")
                        .slice(1)
                        .join(" — ")
                    )
                  : ""
              }

            </div>

          `)
          .join("")
      }


      <h2>
        방어
      </h2>

      ${
        (x.defense || [])
          .map(a => `

            <div class="ability">
              ${esc(a)}
            </div>

          `)
          .join("")
      }


      <h2>
        궁극기
      </h2>

      <div class="ability">
        ${esc(x.ultimate || "")}
      </div>


      ${
        x.future?.length
          ? `

            <h2>
              미래 관련 능력
            </h2>

            ${
              x.future
                .map(a => `
                  <div class="ability">
                    ${esc(a)}
                  </div>
                `)
                .join("")
            }

          `
          : ""
      }


      <h2>
        기록
      </h2>

      <div class="ability">
        “${esc(
          x.quote || "기록된 인용문 없음"
        )}”
      </div>

    </section>
  `;
}


/* =========================
   SCP가 속한 세대로 돌아가기
   ========================= */

function genFor(id) {

  for (
    const [n, g]
    of Object.entries(data.generations || {})
  ) {

    if (
      (g || []).some(
        x => x.id === id
      )
    ) {

      renderGen(n);

      return;
    }
  }
}


/* =========================
   티어표
   ========================= */

function renderTier() {

  root.innerHTML = `

    <button
      class="back"
      onclick="home()"
    >
      ← 홈
    </button>

    <section class="panel">

      <div class="eyebrow">
        LIVE POWER RANKING
      </div>

      <h1>
        실시간 티어표
      </h1>

      ${
        (data.tiers || [])
          .map(t => `

            <div class="tier-row">

              <div class="tier-label">
                ${esc(t.tier)}
              </div>

              <div class="tier-items">

                ${
                  (t.items || [])
                    .map(id => {

                      const x = find(id);

                      return `
                        <div class="tier-chip">
                          ${esc(x?.name || id)}
                        </div>
                      `;

                    })
                    .join("")
                }

              </div>

            </div>

          `)
          .join("")
        ||
        '<div class="empty">티어표가 없습니다.</div>'
      }

    </section>
  `;
}


/* =========================
   세계관 스토리
   ========================= */

function renderText(kind, title) {

  const obj = data[kind] || {};

  root.innerHTML = `

    <button
      class="back"
      onclick="home()"
    >
      ← 홈
    </button>

    <section class="panel">

      <div class="eyebrow">
        WORLD BUILDING
      </div>

      <h1>
        ${esc(obj.title || title)}
      </h1>

      <div
        class="muted"
        style="white-space:pre-wrap;line-height:1.8"
      >
        ${esc(
          obj.body ||
          "내용이 없습니다."
        )}
      </div>

    </section>
  `;
}


/* =========================
   사건 기록
   ========================= */

function renderEvents() {

  root.innerHTML = `

    <button
      class="back"
      onclick="home()"
    >
      ← 홈
    </button>

    <section class="panel">

      <h1>
        📜 사건 기록
      </h1>

      ${
        (data.events || [])
          .map(e => `

            <div class="ability">

              <b>
                ${esc(e.title || "사건")}
              </b>

              <br>

              <span class="muted">
                ${esc(e.body || "")}
              </span>

            </div>

          `)
          .join("")
        ||
        '<div class="empty">기록된 사건이 없습니다.</div>'
      }

    </section>
  `;
}


/* =========================
   업데이트 기록
   ========================= */

function renderUpdates() {

  root.innerHTML = `

    <button
      class="back"
      onclick="home()"
    >
      ← 홈
    </button>

    <section class="panel">

      <h1>
        📰 업데이트 기록
      </h1>

      ${
        (data.updates || [])
          .slice()
          .reverse()
          .map(e => `

            <div class="update">

              ${esc(e.text)}

              <span class="small">
                ${esc(e.time || "")}
              </span>

            </div>

          `)
          .join("")
        ||
        '<div class="empty">업데이트가 없습니다.</div>'
      }

    </section>
  `;
}


/* =========================
   보안용 HTML 문자 처리
   ========================= */

function esc(s) {

  return String(s ?? "").replace(
    /[&<>"']/g,
    c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[c])
  );
}


function escAttr(s) {

  return esc(s).replace(
    /`/g,
    "&#096;"
  );
}


/* =========================
   전역 함수
   ========================= */

window.home = renderHome;
window.detail = detail;
window.genFor = genFor;


/* =========================
   메뉴
   ========================= */

document
  .getElementById("openMenu")
  .onclick = () => {

    document
      .getElementById("drawer")
      .classList
      .add("open");

    document
      .getElementById("shade")
      .classList
      .add("show");
  };


document
  .getElementById("closeMenu")
  .onclick = () => closeMenu();


document
  .getElementById("shade")
  .onclick = () => closeMenu();


function closeMenu() {

  document
    .getElementById("drawer")
    .classList
    .remove("open");

  document
    .getElementById("shade")
    .classList
    .remove("show");
}


/* =========================
   메뉴 버튼 연결
   ========================= */

document
  .querySelectorAll(".menu-item[data-view]")
  .forEach(b => {

    b.onclick = () => {

      closeMenu();

      const v = b.dataset.view;

      if (v === "generation") {

        renderGen(
          b.dataset.gen
        );

      } else if (v === "tier") {

        renderTier();

      } else if (v === "story") {

        renderText(
          "story",
          "세계관 스토리"
        );

      } else if (v === "events") {

        renderEvents();

      } else if (v === "updates") {

        renderUpdates();
      }
    };
  });


/* =========================
   Firebase 실시간 연결
   ========================= */

if (safeConfig()) {

  try {

    const app =
      initializeApp(firebaseConfig);

    db =
      getDatabase(app);

    onValue(
      ref(db, "database"),
      snap => {

        if (snap.exists()) {

          setData(
            snap.val()
          );

          renderHome();

        } else {

          setData(
            demo
          );

          renderHome();
        }
      }
    );

    onValue(
      ref(db, "database"),
      () => {

        status.textContent =
          "● 실시간 연결";
      }
    );

  } catch (e) {

    console.error(e);

    setData(demo);

    status.textContent =
      "○ 데모(설정 오류)";

    renderHome();
  }

} else {

  setData(demo);

  renderHome();
}


/* =========================
   초기 화면
   ========================= */

renderHome();
