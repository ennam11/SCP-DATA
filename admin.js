alert("ADMIN JS 실행됨");
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import { firebaseConfig } from "./firebase-config.js";

console.log("ADMIN JS START");

const appEl = document.getElementById("adminApp");

let firebaseApp;
let db;
let auth;
let data;


// ================================
// 기본 데이터
// ================================

function defaultData() {
  return {
    generations: {
      1: [],
      2: [],
      3: [],
      4: []
    },

    tiers: [],

    story: {
      title: "SCP FRIEND UNIVERSE",
      body: ""
    },

    events: [],

    updates: []
  };
}


// ================================
// HTML 안전 처리
// ================================

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ================================
// 로그인 화면
// ================================

function showLogin(message = "") {

  appEl.innerHTML = `

    <section class="panel">

      <h1>⚙ 관리자</h1>

      <p>
        관리자 계정으로 로그인하세요.
      </p>

      <div class="field">

        <label>이메일</label>

        <input
          id="adminEmail"
          type="email"
          placeholder="관리자 이메일"
        >

      </div>

      <div class="field">

        <label>비밀번호</label>

        <input
          id="adminPassword"
          type="password"
          placeholder="비밀번호"
        >

      </div>

      <button
        class="primary"
        id="loginButton">

        로그인

      </button>

      <p
        id="loginMessage"
        class="small error">

        ${esc(message)}

      </p>

      <p class="small">

        <a href="index.html">
          ← 사이트로 돌아가기
        </a>

      </p>

    </section>

  `;


  const button =
    document.getElementById("loginButton");


  button.onclick = async () => {

    const email =
      document.getElementById("adminEmail")
        .value
        .trim();

    const password =
      document.getElementById("adminPassword")
        .value;

    const message =
      document.getElementById("loginMessage");


    if (!email || !password) {

      message.textContent =
        "이메일과 비밀번호를 입력하세요.";

      return;
    }


    message.textContent =
      "로그인 중...";


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    } catch (error) {

      console.error(error);

      message.textContent =
        "로그인 실패: 이메일 또는 비밀번호를 확인하세요.";

    }

  };

}


// ================================
// Firebase 데이터 불러오기
// ================================

async function loadData() {

  try {

    const snapshot =
      await get(
        ref(db, "database")
      );


    if (snapshot.exists()) {

      data = snapshot.val();

    } else {

      data = defaultData();

    }


    if (!data.generations) {

      data.generations = {
        1: [],
        2: [],
        3: [],
        4: []
      };

    }


    if (!data.tiers) {
      data.tiers = [];
    }


    if (!data.events) {
      data.events = [];
    }


    if (!data.updates) {
      data.updates = [];
    }


    if (!data.story) {

      data.story = {
        title: "SCP FRIEND UNIVERSE",
        body: ""
      };

    }


    showAdmin();

  } catch (error) {

    console.error(error);

    appEl.innerHTML = `

      <section class="panel">

        <h1>❌ 데이터 불러오기 실패</h1>

        <p class="error">
          ${esc(error.message)}
        </p>

        <p>
          Firebase Realtime Database 설정을 확인하세요.
        </p>

      </section>

    `;

  }

}


// ================================
// 관리자 메인
// ================================

function showAdmin() {

  appEl.innerHTML = `

    <section class="panel">

      <h1>⚙ SCP 관리자</h1>

      <p>
        Firebase 실시간 데이터 관리
      </p>


      <div class="admin-tabs">

        <button id="scpButton">
          SCP 관리
        </button>

        <button id="tierButton">
          실시간 티어표
        </button>

        <button id="storyButton">
          세계관
        </button>

        <button id="eventButton">
          사건 기록
        </button>

        <button id="logoutButton">
          로그아웃
        </button>

      </div>

    </section>


    <div id="editor"></div>

  `;


  document.getElementById("scpButton").onclick =
    showSCPs;


  document.getElementById("tierButton").onclick =
    showTiers;


  document.getElementById("storyButton").onclick =
    showStory;


  document.getElementById("eventButton").onclick =
    showEvents;


  document.getElementById("logoutButton").onclick =
    async () => {

      await signOut(auth);

    };


  showSCPs();

}


// ================================
// SCP 목록
// ================================

function showSCPs() {

  const editor =
    document.getElementById("editor");


  let html = `

    <section class="panel">

      <h2>📁 SCP 관리</h2>

  `;


  for (let generation = 1; generation <= 4; generation++) {

    const list =
      data.generations[generation] || [];


    html += `

      <h3>${generation}세대</h3>

      <div class="grid">

    `;


    if (list.length === 0) {

      html += `

        <p class="small">
          등록된 SCP가 없습니다.
        </p>

      `;

    }


    list.forEach(item => {

      html += `

        <div class="card">

          <div class="code">
            ${esc(item.id)}
          </div>

          <div class="title">
            ${esc(item.name)}
          </div>

          <div class="row">

            <button
              class="secondary"
              data-edit="${esc(item.id)}">

              수정

            </button>


            <button
              class="danger"
              data-delete="${esc(item.id)}">

              삭제

            </button>

          </div>

        </div>

      `;

    });


    html += `

      </div>

      <button
        class="primary"
        data-add="${generation}">

        + ${generation}세대 SCP 추가

      </button>

      <br><br>

    `;

  }


  html += `

    </section>

  `;


  editor.innerHTML = html;


  editor
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.onclick = () => {

        showSCPForm(
          null,
          Number(button.dataset.add)
        );

      };

    });


  editor
    .querySelectorAll("[data-edit]")
    .forEach(button => {

      button.onclick = () => {

        const item =
          findSCP(button.dataset.edit);

        showSCPForm(
          item,
          item.generation
        );

      };

    });


  editor
    .querySelectorAll("[data-delete]")
    .forEach(button => {

      button.onclick = () => {

        deleteSCP(
          button.dataset.delete
        );

      };

    });

}


// ================================
// SCP 찾기
// ================================

function findSCP(id) {

  for (let generation = 1; generation <= 4; generation++) {

    const list =
      data.generations[generation] || [];


    const item =
      list.find(x => x.id === id);


    if (item) {

      return {
        ...item,
        generation
      };

    }

  }


  return null;

}


// ================================
// SCP 입력 폼
// ================================

function showSCPForm(item, generation) {

  const editor =
    document.getElementById("editor");


  const value =
    item || {

      id: "",
      name: "",
      risk: "",
      containment: "",
      description: "",
      abilities: [],
      defense: [],
      future: [],
      ultimate: "",
      quote: ""

    };


  editor.innerHTML = `

    <section class="panel">

      <h2>
        ${item ? "✏️ SCP 수정" : "➕ SCP 추가"}
      </h2>


      <div class="field">

        <label>세대</label>

        <select id="scpGeneration">

          <option value="1" ${generation === 1 ? "selected" : ""}>
            1세대
          </option>

          <option value="2" ${generation === 2 ? "selected" : ""}>
            2세대
          </option>

          <option value="3" ${generation === 3 ? "selected" : ""}>
            3세대
          </option>

          <option value="4" ${generation === 4 ? "selected" : ""}>
            4세대
          </option>

        </select>

      </div>


      ${input("scpId", "SCP 번호", value.id)}

      ${input("scpName", "이름", value.name)}

      ${input("scpRisk", "위험 등급", value.risk)}

      ${input(
        "scpContainment",
        "격리 상태",
        value.containment
      )}


      ${textarea(
        "scpDescription",
        "설명",
        value.description
      )}


      ${textarea(
        "scpAbilities",
        "능력 (한 줄에 하나)",
        (value.abilities || []).join("\n")
      )}


      ${textarea(
        "scpDefense",
        "방어 능력 (한 줄에 하나)",
        (value.defense || []).join("\n")
      )}


      ${textarea(
        "scpFuture",
        "미래 관련 능력",
        (value.future || []).join("\n")
      )}


      ${textarea(
        "scpUltimate",
        "궁극기",
        value.ultimate
      )}


      ${textarea(
        "scpQuote",
        "인용문",
        value.quote
      )}


      <div class="row">

        <button
          class="primary"
          id="saveSCP">

          저장

        </button>


        <button
          class="secondary"
          id="cancelSCP">

          취소

        </button>

      </div>

    </section>

  `;


  document.getElementById("saveSCP").onclick =
    async () => {

      const newItem = {

        id:
          get("scpId"),

        name:
          get("scpName"),

        risk:
          get("scpRisk"),

        containment:
          get("scpContainment"),

        description:
          get("scpDescription"),

        abilities:
          lines("scpAbilities"),

        defense:
          lines("scpDefense"),

        future:
          lines("scpFuture"),

        ultimate:
          get("scpUltimate"),

        quote:
          get("scpQuote")

      };


      if (!newItem.id || !newItem.name) {

        alert(
          "SCP 번호와 이름을 입력하세요."
        );

        return;

      }


      const newGeneration =
        Number(
          document.getElementById(
            "scpGeneration"
          ).value
        );


      // 기존 SCP 삭제
      for (let g = 1; g <= 4; g++) {

        data.generations[g] =
          (data.generations[g] || [])
            .filter(x =>
              x.id !== newItem.id &&
              (!item || x.id !== item.id)
            );

      }


      // 새 세대에 추가
      data.generations[newGeneration] =
        data.generations[newGeneration] || [];


      data.generations[newGeneration]
        .push(newItem);


      await saveData(
        item
          ? "SCP 수정: " + newItem.name
          : "SCP 추가: " + newItem.name
      );


      showSCPs();

    };


  document.getElementById("cancelSCP").onclick =
    showSCPs;

}


// ================================
// 입력 도우미
// ================================

function input(id, label, value) {

  return `

    <div class="field">

      <label>${label}</label>

      <input
        id="${id}"
        value="${esc(value)}">

    </div>

  `;

}


function textarea(id, label, value) {

  return `

    <div class="field">

      <label>${label}</label>

      <textarea id="${id}">${esc(value)}</textarea>

    </div>

  `;

}


function get(id) {

  return document.getElementById(id)?.value || "";

}


function lines(id) {

  return get(id)
    .split("\n")
    .map(x => x.trim())
    .filter(Boolean);

}


// ================================
// SCP 삭제
// ================================

async function deleteSCP(id) {

  if (!confirm("정말 삭제할까요?")) {
    return;
  }


  for (let generation = 1; generation <= 4; generation++) {

    data.generations[generation] =
      (data.generations[generation] || [])
        .filter(item => item.id !== id);

  }


  await saveData(
    "SCP 삭제: " + id
  );


  showSCPs();

}


// ================================
// 티어표
// ================================

function showTiers() {

  const editor =
    document.getElementById("editor");


  const tierText =
    (data.tiers || [])
      .map(tier =>
        `${tier.tier}|${(tier.items || []).join(",")}`
      )
      .join("\n");


  editor.innerHTML = `

    <section class="panel">

      <h2>⚔️ 실시간 티어표</h2>

      <p class="small">

        형식:<br>

        S+|SCP-JSI-000,SCP-TCJ-999

      </p>


      <textarea
        id="tierText"
        style="min-height:250px"
      >${esc(tierText)}</textarea>


      <br><br>


      <button
        class="primary"
        id="saveTiers">

        티어표 저장

      </button>

    </section>

  `;


  document.getElementById("saveTiers").onclick =
    async () => {

      const text =
        get("tierText");


      data.tiers =
        text
          .split("\n")
          .map(line => {

            const parts =
              line.split("|");


            return {

              tier:
                (parts[0] || "").trim(),

              items:
                (parts[1] || "")
                  .split(",")
                  .map(x => x.trim())
                  .filter(Boolean)

            };

          })
          .filter(x => x.tier);


      await saveData(
        "티어표 수정"
      );

    };

}


// ================================
// 세계관
// ================================

function showStory() {

  const editor =
    document.getElementById("editor");


  editor.innerHTML = `

    <section class="panel">

      <h2>📖 세계관 스토리</h2>


      ${input(
        "storyTitle",
        "제목",
        data.story?.title || ""
      )}


      ${textarea(
        "storyBody",
        "내용",
        data.story?.body || ""
      )}


      <button
        class="primary"
        id="saveStory">

        세계관 저장

      </button>

    </section>

  `;


  document.getElementById("saveStory").onclick =
    async () => {

      data.story = {

        title:
          get("storyTitle"),

        body:
          get("storyBody")

      };


      await saveData(
        "세계관 수정"
      );

    };

}


// ================================
// 사건 기록
// ================================

function showEvents() {

  const editor =
    document.getElementById("editor");


  const events =
    data.events || [];


  editor.innerHTML = `

    <section class="panel">

      <h2>📜 사건 기록</h2>


      ${
        events.length === 0

          ? `<p class="small">
               등록된 사건이 없습니다.
             </p>`

          : events.map((event, index) => `

              <div class="card">

                <h3>
                  ${esc(event.title)}
                </h3>

                <p>
                  ${esc(event.body)}
                </p>


                <button
                  class="danger"
                  data-event-delete="${index}">

                  삭제

                </button>

              </div>

            `).join("")
      }


      <hr>


      <h3>새 사건 추가</h3>


      ${input(
        "eventTitle",
        "사건 제목",
        ""
      )}


      ${textarea(
        "eventBody",
        "사건 내용",
        ""
      )}


      <button
        class="primary"
        id="addEvent">

        사건 추가

      </button>

    </section>

  `;


  editor
    .querySelectorAll(
      "[data-event-delete]"
    )
    .forEach(button => {

      button.onclick = async () => {

        const index =
          Number(
            button.dataset.eventDelete
          );


        if (!confirm("이 사건을 삭제할까요?")) {
          return;
        }


        data.events.splice(index, 1);


        await saveData(
          "사건 삭제"
        );


        showEvents();

      };

    });


  document.getElementById("addEvent").onclick =
    async () => {

      const title =
        get("eventTitle").trim();

      const body =
        get("eventBody").trim();


      if (!title) {

        alert(
          "사건 제목을 입력하세요."
        );

        return;

      }


      data.events =
        data.events || [];


      data.events.push({

        title,
        body

      });


      await saveData(
        "사건 추가: " + title
      );


      showEvents();

    };

}


// ================================
// Firebase 저장
// ================================

async function saveData(message) {

  try {

    data.updates =
      data.updates || [];


    data.updates.push({

      text: message,

      time:
        new Date()
          .toLocaleString("ko-KR")

    });


    await set(
      ref(db, "database"),
      data
    );


    alert(
      "✅ 저장 완료!\n친구들의 사이트에도 반영됩니다."
    );


  } catch (error) {

    console.error(error);


    alert(
      "❌ 저장 실패\n" +
      error.message
    );

  }

}


// ================================
// Firebase 초기화
// ================================

try {

  firebaseApp =
    initializeApp(firebaseConfig);


  db =
    getDatabase(firebaseApp);


  auth =
    getAuth(firebaseApp);


  onAuthStateChanged(
    auth,
    user => {

      if (user) {

        loadData();

      } else {

        showLogin();

      }

    }
  );


} catch (error) {

  console.error(error);


  appEl.innerHTML = `

    <section class="panel">

      <h1>❌ Firebase 오류</h1>

      <p class="error">

        ${esc(error.message)}

      </p>

    </section>

  `;

}
