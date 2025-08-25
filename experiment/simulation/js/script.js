const powerOn = document.querySelector("#powerOn");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const off = document.querySelector("#off");
const on = document.querySelector("#on");
const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const onSwitch = document.querySelector("#switch");
const upArrow = document.querySelector("#upArrow");
const downArrow = document.querySelector("#downArrow");
const cd = document.querySelector("#Cd");
const vProfile = document.querySelector("#vProfile");
const readTableCont = document.querySelector(".reading-table-container");
const cdRowInsert = document.querySelector("#cd-row-insert");
const velRow = document.querySelector("#row-insert");
const writeFlowRate = document.querySelector("#writeFlowRate");
const writeFlowRateInObs = document.querySelector("#writeFlowRateInObs");
const saveBtn = document.querySelector("#save-btn");
const showObsTable = document.querySelector("#show-obs-table");
const obsTableContainer = document.querySelector("#obsTableContainer");
const arrows = document.querySelector(".arrows");
const velProfileReading = document.querySelector("#vel-profile-reading");
const cdReading = document.querySelector("#cd-reading");
const velObsTable = document.querySelector("#vel-obsTable");
const cdObsTable = document.querySelector("#cd-obsTable");
const obsTableButton = document.querySelector(".obs-table-container");
const save = document.querySelector(".save");
const exportbtn = document.querySelector("#toExcel");
const saveAsExcel = document.querySelector("#export");

let pin_height = 0;
let height = new Array(2);
let flowRate;
let spd_height = new Array(11);
let percentageError = new Array(11);
let staticH = new Array(11);
let dataSet = [];
let velDataSet = [];

pinHeightSlider.seek(50);
let view;
window.onload = function() {
    slider.value = 0;
};

function callCd() {
    pin_height = 0;
    pinHeightSlider.seek(50);
    view = "cd";
    cdReading.style.display = "block";
    velProfileReading.style.display = "none";
    cd.style.color = "black";
    vProfile.style.color = "#b3b0b0";
    arrows.style.display = "none";
    cdRowInsert.innerHTML = `<td></td><td></td><td></td>`
    startUpEssentials();
}

function callVProfile() {
    view = "vProfile";
    cdReading.style.display = "none";
    velProfileReading.style.display = "block";
    vProfile.style.color = "black";
    cd.style.color = "#b3b0b0";
    arrows.style.display = "block";
    velRow.innerHTML = `<td></td><td></td><td></td>`;
    writeFlowRate.innerHTML = "Q =";
    writeFlowRateInObs.innerHTML = "Q =";
    startUpEssentials();
}

function startUpEssentials() {
    dataSet = [];
    velDataSet = [];
    height = [];
    spd_height = [];
    percentageError = [];
    staticH = [];
    on.style.display = "none";
    off.style.display = "block";
    powerOn.style.display = "none";
    readTableCont.style.display = "grid";
    obsTableContainer.style.display = "none";
    exportbtn.style.display = "none";
    onSwitch.style.display = "block";
    right.style.display = "none";
    left.style.display = "none";
    slider.value = 0;
    sliderContainer.style.display = "none";
    showSaveAndObs();
}
callCd();
cd.addEventListener('click', () => {
    if (view != "cd")
        callCd();
});
vProfile.addEventListener('click', () => {
    if (view != "vProfile")
        callVProfile();
});

onSwitch.addEventListener("click", function() {
    off.style.display = "none";
    powerOn.style.display = "block";
    sliderContainer.style.display = "block";
    powerOn.play();
    setTimeout(() => {
        right.style.zIndex = -1;
        right.seek(0);
        right.style.display = "block";
        left.style.zIndex = -1;
        left.seek(0);
        left.style.display = "block";
    }, 2000);
    // generateTubesHeight(flowRate);
    // activatePlayers();
});
upArrow.addEventListener('click', () => {
    if (pin_height <= 8)
        pin_height += 2;
    pinPosition();
})
downArrow.addEventListener('click', () => {
    if (pin_height >= -8)
        pin_height -= 2;
    pinPosition();
})

function activatePlayers() {
    left.seek(Math.round((height[0] - 56.6) * 2.25));
    right.seek(Math.round((height[1] - 57.5) * 2.75));
    // console.log("Heights in Both Tubes\n",height); 
}

function pinPosition() {
    // console.log("Pin Height",pin_height);
    pinHeightSlider.seek(pin_height * 5 + 50);
    setObservationData(pin_height);
    // console.log("Heights in Both Tubes\n",height); 
    activatePlayers();
    takeReading();
    showSaveAndObs();
};
slider.addEventListener('input', function() {
    flowRate = slider.value * 0.0555 + 2.45;
    generateTubesHeight(flowRate);
    // console.log(spd_height);
    setObservationData(pin_height);
    activatePlayers();
    takeReading();
    showSaveAndObs();
});
saveBtn.addEventListener('click', () => {
    if (view == "cd") {
        let tmp = new Array(3);
        tmp[0] = flowRate.toFixed(2);
        tmp[1] = height[0].toFixed(1);
        tmp[2] = height[1].toFixed(1);
        dataSet.push(tmp);
    } else {
        let tmp = new Array(3);
        tmp[0] = pin_height;
        tmp[1] = height[0].toFixed(1);
        tmp[2] = height[1].toFixed(1);
        velDataSet.push(tmp);
    }
})
showObsTable.addEventListener('click', () => {
    obsTableContainer.style.display = "block";
    save.style.display = "none";
    obsTableButton.style.display = "none";
    readTableCont.style.display = "none";
    sliderContainer.style.display = "none";
    saveAsExcel.style.display = "grid";
    onSwitch.style.display = "none";
    exportbtn.style.display = "block";
    if (view == "cd") {
        cdObsTable.style.display = "block";
        velObsTable.style.display = "none";
        for (let i = 0; i < dataSet.length; i++) {
            let template = `
                    <tr>
                        <td>${dataSet[i][0]}</td>
                        <td>${dataSet[i][1]}</td>
                        <td>${dataSet[i][2]}</td>
                    </tr>`;
            cdObsTable.innerHTML += template;
        }
    } else {
        cdObsTable.style.display = "none";
        velObsTable.style.display = "block";
        let tmp = "-1";
        writeFlowRateInObs.innerHTML = `Q = ${flowRate.toFixed(2)} x 10${tmp.sup()} L/s`
        for (let i = 0; i < velDataSet.length; i++) {
            let template = `
                    <tr>
                        <td>${velDataSet[i][0]}</td>
                        <td>${velDataSet[i][1]}</td>
                        <td>${velDataSet[i][2]}</td>
                    </tr>`;
            velObsTable.innerHTML += template;
        }
    }
})

function takeReading() {
    if (view == "cd") {
        let template = `
                <td>${flowRate.toFixed(2)}</td>
                <td>${height[0].toFixed(1)}</td>
                <td>${height[1].toFixed(1)}</td>`;
        cdRowInsert.innerHTML = template;
    } else {
        let tmp = "-1";
        writeFlowRate.innerHTML = `Q = ${flowRate.toFixed(2)} x 10${tmp.sup()} L/s`
        let template = `
                <td>${pin_height}</td>
                <td>${height[0].toFixed(1)}</td>
                <td>${height[1].toFixed(1)}</td>`;
        velRow.innerHTML = template;
    }
}
exportbtn.addEventListener('click', () => {
    if (view == "cd") {
        var table2excel = new Table2Excel();
        table2excel.export(cdObsTable, "pitot_cd");
    } else {
        var table2excel = new Table2Excel();
        table2excel.export(velObsTable, "pitot_vel_profile");
    }

})

function showSaveAndObs() {
    save.style.display = "grid";
    obsTableButton.style.display = "grid";
}
// ✅ Voice Function
function speak(text) {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.pitch = 1;
        utterance.rate = 1;
        synth.cancel(); // stop overlapping
        synth.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support voice output.");
    }
}

// ✅ Welcome voice after user interaction (due to autoplay policy)
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function once() {
        speak(`Welcome to the Pitot Tube Apparatus Simulation.
        Select either Velocity Profile or Coefficient of Velocity to begin.`);
        document.body.removeEventListener('click', once); // trigger only once
    });
});

// ✅ Velocity Profile Button
document.getElementById("vProfile").addEventListener("click", () => {
    speak("Velocity Profile mode selected. Please click the Power On button to begin.");
});

// ✅ Coefficient of Velocity Button
document.getElementById("Cd").addEventListener("click", () => {
    speak("Coefficient of Velocity mode selected. Please click the Power On button to begin.");
});

// ✅ Power On / Off Button
document.getElementById("switch").addEventListener("click", () => {
    const button = document.getElementById("switch");
    if (button.innerText.includes("On")) {
        speak("Apparatus is powered on. Water flow animation is active. Use the slider to change flow rate.");
    } else {
        speak("Apparatus is now powered off.");
    }
});

// ✅ Flowrate Slider
document.getElementById("slider").addEventListener("input", () => {
    speak("Flowrate changed.");
});

// ✅ Pin Height Arrows
document.getElementById("upArrow").addEventListener("click", () => {
    speak("Pin height increased.");
});
document.getElementById("downArrow").addEventListener("click", () => {
    speak("Pin height decreased.");
});

// ✅ Save Button
document.getElementById("save-btn").addEventListener("click", () => {
    speak("Your current reading has been saved.");
});

// ✅ Show Observation Table
document.getElementById("show-obs-table").addEventListener("click", () => {
    speak("Observation Table is now displayed.");
});

// ✅ Export Button
document.getElementById("toExcel").addEventListener("click", () => {
    speak("Exporting data to Excel.");
});


