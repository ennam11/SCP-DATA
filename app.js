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

  risk: "S+ — TRANSCENDENT",

  containment: "UNCONTAINABLE",

  description:
    "고대부터 존재해 온 초월적 개안 현상. 기록에 따르면 재민이가 처음 눈을 뜬 순간 거대한 에너지가 발생했으며, 일부 연구자는 이 현상을 빅뱅과 연관된 사건으로 추정한다.",

  abilities: [
    "개안 레이저 — 눈에서 압축된 빛을 발사한다. 고밀도로 압축된 광선은 강력한 에너지 장벽도 관통할 수 있다.",

    "패왕안 — 시선을 마주친 대상의 움직임을 순간적으로 억제하고 전투 패턴을 분석한다.",

    "성운탄 — 빛과 에너지를 압축해 거대한 구체 형태로 만든 뒤 발사한다. 여러 개를 동시에 생성할 수 있다.",

    "중력안 — 시선이 닿는 공간의 중력 방향과 세기를 자유롭게 변화시킨다.",

    "천공광 — 하늘과 공간에 거대한 빛의 균열을 만들고 그 틈에서 다수의 광선을 떨어뜨린다.",

    "시선 이동 — 자신의 시선과 공격 경로를 공간 너머로 연결해 먼 거리의 대상을 직접 공격할 수 있다.",

    "개안 영역 — 눈을 완전히 개방해 주변 공간 전체를 자신의 시야 영역으로 만든다. 영역 안에서는 공격의 정확도와 위력이 크게 증가한다.",

    "광역 개안 — 자신의 눈에서 방출되는 빛을 주변 공간 전체에 퍼뜨려 여러 방향에서 동시에 광선 공격을 발생시킨다. 빛의 위치를 자유롭게 바꿀 수 있어 회피가 어렵다."
  ],

  defense: [
    "광막 — 여러 겹으로 압축된 빛의 장벽을 만들어 공격 에너지를 흡수하고 분산시킨다.",

    "천체장 — 주변의 에너지와 중력을 이용해 거대한 방어장을 형성한다. 공격의 방향과 속도를 왜곡할 수 있다.",

    "개안 반사 — 들어오는 에너지 공격의 구조를 분석한 뒤 일부 공격을 반사하거나 공격 방향을 변경한다."
  ],

  ultimate:
    "제1개안: 창세 — GENESIS OF THE EYE — 재민이가 지금까지 억제하고 있던 개안의 모든 힘을 한계까지 해방한다. 눈이 완전히 개방되는 순간 주변 공간 전체가 거대한 빛의 영역으로 변하며, 영역 안의 에너지와 빛이 압축되어 새로운 물질과 에너지로 재구성된다. 하늘과 지상, 공간 전체에 수많은 거대한 개안이 나타나 동시에 광선을 방출한다. 모든 광선은 하나의 중심점으로 모여 초고밀도의 창세핵을 만들고, 창세핵이 폭발하면서 주변 공간을 거대한 빛의 파동으로 뒤덮는다. 최대 출력에서는 공간 자체를 새로운 에너지 구조로 재구성할 수 있으며, S+급 개체에게도 치명적인 수준의 위력을 가진다. 사용 직후에는 개안 에너지가 폭발적으로 소모되어 30초 동안 제1개안의 추가 사용과 일부 고출력 능력이 제한된다.",

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
    "삼각형 형태의 초월적 개체. 내부에는 비정상적인 삼각무좀 에너지가 존재하며, 이 힘을 무한히 증식시키고 변형할 수 있다.",

  abilities: [
    "삼각무좀탄 — 삼각무좀 에너지를 압축해 강력한 탄환 형태로 발사한다.",
    "삼각천쇄 — 거대한 삼각형 사슬을 만들어 대상을 구속한다.",
    "무좀 증식 — 삼각무좀 에너지를 여러 개로 분열시켜 전장을 채운다.",
    "삼각균열 — 공간에 삼각형 형태의 균열을 만들어 공격하거나 이동한다.",
    "삼각 폭풍 — 수많은 삼각 에너지를 회전시켜 거대한 폭풍을 만든다.",
    "삼각 반전 — 들어오는 공격의 방향과 에너지 흐름을 반전시킨다.",
    "삼각 분열 — 자신의 공격을 여러 개의 삼각형으로 분리해 동시에 공격한다.",
    "무한 삼각 — 생성된 모든 삼각형 에너지를 하나의 거대한 삼각형으로 융합한다."
  ],

  defense: [
    "삼각 절대방벽 — 거대한 삼각형 방벽을 만들어 공격을 차단한다.",
    "삼각 분해 — 들어오는 에너지를 작은 삼각형 단위로 분해해 위력을 감소시킨다.",
    "무한 증식 방어 — 방어막이 파괴될 때마다 새로운 삼각 방어막을 계속 생성한다."
  ],

  ultimate:
    "삼각무좀: 무한증식 — 하나의 삼각형에서 시작해 3 → 9 → 27 → 81 → …으로 삼각 에너지가 기하급수적으로 증식한다. 전장 전체가 수많은 삼각형으로 뒤덮이고, 모든 삼각형이 하나로 수렴하면서 거대한 삼각 초월핵을 만든다. 초월핵이 폭발하며 전장을 뒤덮고 주변 공간까지 강하게 흔든다. 사용 후 15초 동안 삼각 계열 능력이 약화된다.",

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
    "태율의 자비스. 모든 힘은 자신의 몸에서 생성되는 가상의 백색 물질에서 나온다. 외부에서 힘을 가져오거나 소환하는 방식이 아니라, 스스로 생성한 백색 물질을 자유롭게 변환시킬 수 있다. 현재까지 19,512개의 변형 패턴이 기록되어 있다.",

  abilities: [
    "화이트 블레이드 — 백색 물질을 고밀도로 강화해 날카로운 형태로 만든다. 근거리와 중거리 모두에서 사용할 수 있다.",

    "화이트 버스트 — 짧은 시간 동안 다수의 백색 공격을 연속적으로 방출해 상대의 회피 경로를 차단한다.",

    "화이트 스나이퍼 — 백색 물질을 극도로 압축해 한 점에 집중시킨 장거리 백색 공격으로 발사한다.",

    "화이트 크러셔 — 거대한 질량의 백색 물질을 한 지점에 압축해 강력한 충격을 발생시킨다.",

    "화이트 드릴 — 백색 물질을 회전하는 형태로 변환해 관통력을 극대화한다.",

    "화이트 리코셰 — 공격을 단단한 표면에 튕겨 여러 번 궤도를 변경한다.",

    "화이트 체인 — 백색 물질을 연결 구조로 만들어 대상의 움직임을 제한한다.",

    "종양 — 백색 물질을 특수한 이상 에너지 덩어리인 「종양」으로 변환해 대상에게 부착한다. 종양은 대상의 에너지 흐름을 방해하며 시간이 지날수록 강해진다. 자비스는 종양의 위치와 크기를 자유롭게 조절할 수 있으며, 축적된 에너지를 한꺼번에 방출할 수 있다."
  ],

  defense: [
    "화이트 아머 — 몸 주변의 백색 물질을 고밀도로 굳혀 갑옷 형태의 방어막을 만든다. 물리적인 공격뿐만 아니라 강력한 에너지 공격도 상당 부분 흡수할 수 있다.",

    "화이트 리커버리 — 손상된 백색 물질을 즉시 재생하고 다시 신체 주변에 배치한다. 전투 중에도 방어력을 빠르게 회복할 수 있다.",

    "화이트 리플렉트 — 자신에게 들어오는 특정 에너지 공격을 백색 물질로 흡수한 뒤 공격의 방향과 위력을 분석해 반대 방향으로 되돌려 보낸다."
  ],

  ultimate:
    "JARVIS: WHITE APOCALYPSE — 자비스가 지금까지 자신의 몸에 저장한 거의 모든 백색 물질을 하나의 초고밀도 핵으로 압축한다. 핵이 완성되는 순간 주변의 에너지와 백색 물질까지 끌어들이며 거대한 백색 영역을 형성한다. 이후 핵을 방출하면 초고속 관통, 공간을 뒤흔드는 충격, 광범위한 압력파가 연속적으로 발생한다. 공격 범위에 존재하는 에너지 공격은 백색 물질에 흡수되어 힘의 일부로 전환되며, 방출된 백색 에너지는 다시 여러 방향으로 분열되어 추가 공격을 발생시킨다. 최대 출력에서는 주변 공간 자체가 백색 에너지로 뒤덮일 정도의 위력을 보이며, S+급 개체조차 정면에서 버티기 어려운 것으로 기록되어 있다. 사용 직후에는 백색 물질을 대부분 소모하기 때문에 20초 동안 고출력 능력을 사용할 수 없다.",

  quote:
    "자비스는 하늘에서 힘을 부르지 않는다. 자비스의 모든 힘은 자신에게서 나온다."
},


      /* =========================
         SCP-JSI-000
         ========================= */

      {
{
  id: "SCP-JSI-000",

  name: "일루미나티",

  risk: "SSS — TRANSCENDENT",

  containment: "UNCONTAINABLE — REALITY BOUNDARY TRANSCENDENT",

  description:
    "재민이의 눈과 시온의 힘이 융합된 초월 개체. 단순히 두 힘을 합친 것이 아니라, 서로의 능력이 하나의 구조로 재구성되어 새로운 힘을 만들어낸다.",

  abilities: [
    "트라이앵글 아이 — 삼각형 구조와 개안의 힘을 결합해 강력한 광선을 발사한다.",

    "무좀 프리즘 — 삼각 구조를 이용해 공격 에너지를 분해하고 여러 방향으로 굴절시킨다.",

    "성운 삼각포 — 거대한 삼각형 에너지 포를 만들어 압축된 성운 에너지를 발사한다.",

    "개안 폭격 — 하늘에 다수의 눈을 생성해 광선을 동시에 떨어뜨린다.",

    "삼각 초신성 — 거대한 삼각형 에너지를 압축한 뒤 폭발시켜 광범위한 에너지를 방출한다.",

    "미래 관측 — 가능한 미래의 흐름을 관측해 상대의 다음 행동을 예측한다.",

    "미래 고정 — 관측한 미래 중 하나를 선택해 일정 시간 동안 그 결과가 발생하도록 고정한다.",

    "라스트 트라이앵글 — 개안과 삼각 에너지를 하나로 압축해 초고밀도의 삼각형 에너지 공격을 만든다."
  ],

  defense: [
    "일루미나티 프리즘 — 들어오는 에너지를 여러 방향으로 분산시켜 피해를 줄인다.",

    "삼중 개안 — 세 개의 개안이 동시에 주변을 분석해 공격을 감지하고 대응한다.",

    "미래 회피 — 공격이 적중하는 미래를 관측한 뒤 다른 미래의 흐름으로 이동한다."
  ],

  ultimate:
    "ILLUMINATI: LAST EYE — 하늘 전체에 거대한 삼각형이 나타나고 그 중앙에 초거대 개안이 열린다. 수천 개의 삼각형 에너지가 중앙의 눈으로 모이며 하나의 초월적 에너지로 융합된다. 눈이 한 번 깜빡이는 순간 공간 자체가 거대한 삼각형 형태로 변환되고, 그 내부에서 광선과 삼각 에너지가 동시에 폭발한다. 최대 출력에서는 주변 공간의 구조까지 일시적으로 재구성할 수 있다. 사용 후 30초 동안 공격 능력과 미래 관측이 제한된다.",

  quote:
    "자비스는 미래를 예측하지 않는다. 일루미나티가 자비스가 패배하는 미래를 찾아낼 뿐이다."
},


      /* =========================
         SCP-BOS-???
         BLACK OF SIHU
         ========================= */

      {
{
  id: "SCP-BOS-???",
  name: "BLACK OF SIHU",
  risk: "SS — UNMEASURABLE",
  containment: "UNCONTAINABLE",

  description:
    "기원을 알 수 없는 초월적 존재. 약 BC 500년경 아프리카의 동굴 벽화에서 최초의 기록이 발견되었다. 주변의 빛이 거의 존재하지 않는 환경에서 관측되는 경우가 많으며, 신체와 주변 공간을 초월적 흑색 물질로 변화시킬 수 있다.",

  abilities: [
    "타르칼 — 신체 일부를 초월적 흑색 물질의 칼날로 변환한다. 물질과 에너지 장벽뿐만 아니라 공간의 경계까지 절단할 수 있다.",
    "흑요석 광선 — 주변의 흑요석을 끌어모아 에너지로 변환한 뒤 강력한 흑색 광선을 발사한다.",
    "흑요석 가시 — 지면에서 거대한 흑요석 가시를 원하는 위치에 생성한다.",
    "BLACK CORE — 흑색 물질을 압축해 빛과 에너지를 흡수하는 핵을 만든다.",
    "OBSIDIAN APOCALYPSE — 흑요석 가시와 BLACK CORE를 융합해 대규모 흑색 에너지를 폭발시킨다.",
    "BLACKOUT — 주변의 빛을 흡수해 거대한 암흑 영역을 만든다.",
    "DARK STEP — 어두운 공간과 어두운 공간 사이를 순간적으로 이동한다.",
    "CARBON RAIN — 탄소를 압축해 흑색 에너지로 변환한 뒤 하늘에서 다수의 작은 BLACK CORE를 떨어뜨린다."
  ],

  defense: [
    "BLACK SKIN — 신체 표면을 초월적 흑색 물질로 덮어 외부 공격을 흡수하고 분산한다.",
    "DARK RECOVERY — 주변의 어둠과 흑색 에너지를 흡수해 손상된 신체와 능력을 회복한다.",
    "OBSIDIAN SHELL — 거대한 흑요석 껍질을 만들어 외부의 공격을 차단한다."
  ],

  ultimate:
    "SIHU: END OF LIGHT — BLACK OF SIHU가 자신의 모든 흑색 능력을 하나의 초월적 BLACK CORE로 압축한다. BLACK CORE는 주변의 빛과 에너지를 지속적으로 흡수하며 크기를 키우고 거대한 암흑 영역을 형성한다. 영역 내부의 모든 흑색 능력이 동시에 활성화되며, BLACKOUT, OBSIDIAN APOCALYPSE, CARBON RAIN이 BLACK CORE와 연결된다. 마지막에는 모든 에너지가 하나의 초월핵으로 압축되고, 해방되는 순간 거대한 암흑 파동이 퍼져나가 빛과 에너지의 흐름 자체를 일시적으로 차단한다. 최대 출력에서는 태양계 규모의 공간까지 영향을 미칠 가능성이 기록되어 있다. 사용 후 30초 동안 초월 계열 능력의 사용이 제한된다.",

  quote:
    "빛이 사라진 곳에 시후가 있었다. 그리고 그곳에는 더 이상 어둠과 시후를 구분할 수 없었다."
},

    ]
  },

  /*
   =========================
   티어표
   =========================
  */

  tiers: [
tiers: [
  {
    tier: "SSS",
    items: ["SCP-JSI-000"]
  },
  {
    tier: "SS",
    items: ["SCP-TCJ-999", "SCP-BOS-???"]
  },
  {
    tier: "S+",
    items: ["SCP-JEC-001"]
  },
  {
    tier: "S",
    items: ["SCP-STP-404"]
  },
  {
    tier: "A",
    items: []
  }
],

  story: {
    title: "SCP FRIEND UNIVERSE",
    body: "이곳에 세계관의 시작과 세대별 역사를 작성하세요."
  },

  events: [],

  updates: [
    {
      text: "SCP-BOS-??? BLACK OF SIHU 등록",
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
  GYUBBANG company
</div>

<h1>
  THE LAST PROTOCOLTHE(마지막 大재앙)
</h1>
      <p>
        세대, SCP, 스토리와 티어를 한 곳에서 확인하세요.
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
