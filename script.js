// Run when page loads
var BATCHES = ["B1", "B2", "B3", "B4"];
window.onload = function () {

    SUBJECT_TEACHER_PAIRS = JSON.parse(JSON.stringify(YEAR_DATA["SE"]));

    renderSlotEditor(DEFAULT_SLOTS);
    renderPairEditor();
};

// Store data for each year
var YEAR_DATA = {

    SE: [
        { subject: 'CT', teacher: 'Prof.Mohini Thite ', type: 'Lecture' },
        { subject: 'DBMS', teacher: 'Prof. Smita Wadekar', type: 'Lecture' },
        { subject: 'DBMS', teacher: 'Prof. Smita Wadekar', type: 'Lab' },
        { subject: 'OS', teacher: 'Prof. Archana Khelurkar', type: 'Lecture' },
        { subject: 'OS', teacher: 'Prof. Junaid Shaikh', type: 'Lab' },
        { subject: 'MDM', teacher: 'Prof. Asma Shaikh', type: 'Lecture' },
        { subject: 'MDM', teacher: 'Prof. Asma Shaikh', type: 'Lab' },
        { subject: 'OE', teacher: 'Prof. Smita Wadekar', type: 'Lecture' },
        { subject: 'DT', teacher: 'Prof. Asha Kantekar', type: 'Lab' },
        { subject: 'BMD', teacher: 'Prof. Adhiti Jadhav ', type: 'Lab' },
        { subject: 'MiniProject', teacher: 'Prof.Mohini Thite', type: 'Lab' },
      
    ],

    TE: [
        { subject: 'IOT', teacher: 'Prof.Sarita Bopalkar', type: 'Lecture' },
        { subject: 'EHDF', teacher: 'Prof. Umakant Gohatre', type: 'Lecture' },
        { subject: 'Webx', teacher: 'Prof.Archana Khelurkar', type: 'Lecture' },
        { subject: 'Webx', teacher: 'Prof.Archana Khelurkar', type: 'Lab' },
        { subject: 'CNS', teacher: 'Prof.Mohini Thite', type: 'Lecture' },
        { subject: 'CNS', teacher: 'Prof.Mohini Thite', type: 'Lab' },
        { subject: 'MiniProject', teacher: 'Prof.Mohini Thite', type: 'Lab' },
        { subject: 'BT', teacher: 'Prof.Sanjay Deshmukh', type: 'Lecture' },
        { subject: ' MASPT', teacher: 'Prof. Smita Wadekar', type: 'Lab' },
        { subject: ' BT', teacher: 'Prof. Junaid Shaikh', type: 'Lab' },
        { subject: ' IOT', teacher: 'Prof. Asma Shaikh ', type: 'Lab' }
    ],

    BE: [
        { subject: 'NFT', teacher: 'Dr. Msdhu N.', type: 'Lecture' },
        { subject: 'IF', teacher: 'Prof. Asha Kantekar', type: 'Lecture' },
        { subject: 'Metaverse', teacher: 'Prof. Sarita Bopalkar', type: 'Lecture' },
        { subject: 'IOTA', teacher: 'Prof.  Sarita Bopalkar', type: 'Lab' },
        { subject: 'Capstone Lab', teacher: 'Dr. Msdhu N.', type: 'Lab' },
        { subject: 'EDM', teacher: 'Prof. Junaid Shaikh', type: 'Lecture' },
        { subject: 'MejorProject', teacher: 'Prof.  Sarita Bopalkar', type: 'Lab' },

    ]

};
var currentYear = "SE";

// When user switches year
function selectSection(section, btn) {

    // remove active class from all buttons
    document.querySelectorAll(".nav-btn").forEach(b => {
        b.classList.remove("active");
    });

    // add active to clicked button
    btn.classList.add("active");

    // if time slot clicked
    if (section === "SLOTS") {
        document.getElementById("subjectSection").style.display = "none";
        document.getElementById("slotSection").style.display = "block";
        return;
    }

    // show subject section
    document.getElementById("subjectSection").style.display = "block";
    document.getElementById("slotSection").style.display = "none";

    currentYear = section;

    // 🔥 IMPORTANT: deep copy (fix switching bug)
    SUBJECT_TEACHER_PAIRS = JSON.parse(JSON.stringify(YEAR_DATA[section]));

    renderPairEditor();
}
 

function renderPairEditor() {
    var container = document.getElementById('pairEditor');
    var html = '';

    SUBJECT_TEACHER_PAIRS.forEach(function (pair, i) {
        html +=
             '<div class="pair-row">' +
            '<div class="pair-number">' + (i + 1) + '</div>' +
            '<input type="text" placeholder="Subject name" value="' + pair.subject + '" ' +
            'onchange="updatePair(' + i + ',\'subject\',this.value)">' +
            '<input type="text" placeholder="Teacher name" value="' + pair.teacher + '" ' +
            'onchange="updatePair(' + i + ',\'teacher\',this.value)">' +
            '<select onchange="updatePair(' + i + ',\'type\',this.value)">' +
            '<option value="Lecture"' + (pair.type === 'Lecture' ? ' selected' : '') + '>Lecture</option>' +
            '<option value="Lab"' + (pair.type === 'Lab' ? ' selected' : '') + '>Lab</option>' +
            '<option value="Practical"' + (pair.type === 'Practical' ? ' selected' : '') + '>Lecture/Lab</option>' +
            '<option value="Tutorial"' + (pair.type === 'Tutorial' ? ' selected' : '') + '>Tutorial</option>' +
            '</select>' +
            '<button onclick="deletePair(' + i + ')" style="background:#ef4444; color:#fff; border:none; border-radius:6px; width:28px; height:28px; cursor:pointer;">✕</button>' +
            '</div>';
    });

    container.innerHTML = html;
}

function updatePair(index, field, value) {
    SUBJECT_TEACHER_PAIRS[index][field] = value;

    // 🔥 save back to correct year
    YEAR_DATA[currentYear] = SUBJECT_TEACHER_PAIRS;
}
function addPair() {
    SUBJECT_TEACHER_PAIRS.push({ subject: '', teacher: '', type: [] });
    YEAR_DATA[currentYear] = SUBJECT_TEACHER_PAIRS;
    renderPairEditor();
}

function removePair() {
    if (SUBJECT_TEACHER_PAIRS.length > 1) {
        SUBJECT_TEACHER_PAIRS.pop();
        renderPairEditor();
    }
}


function deletePair(index) {
    SUBJECT_TEACHER_PAIRS.splice(index, 1);
    YEAR_DATA[currentYear] = SUBJECT_TEACHER_PAIRS;
    renderPairEditor();
}

// Default time slots: 4 lectures (9:30-1:30), lunch (1:30-2:00), 3 lectures (2:00-5:00)
var DEFAULT_SLOTS = [
    { start: '09:30', end: '10:30', type: 'Lecture' },
    { start: '10:30', end: '11:30', type: 'Lecture' },
    { start: '11:30', end: '12:30', type: 'Lecture' },
    { start: '12:30', end: '01:00', type: 'Lunch' },
    { start: '01:00', end: '02:00', type: 'Lecture' },
    { start: '02:00', end: '03:00', type: 'Lecture' },
    { start: '03:00', end: '04:00', type: 'Lab' },
    { start: '04:00', end: '05:00', type: 'Lab' }
];
// ─── TIME SLOT EDITOR FUNCTIONS ──────────────────────

function renderSlotEditor(slots) {
    var container = document.getElementById('timeSlotEditor');
    var html = '';

    slots.forEach(function (slot, i) {
        html +=
            '<div style="display:grid; grid-template-columns:50px 1fr 40px 1fr 120px 36px; gap:8px; align-items:center; margin-bottom:6px;">' +
            '<span style="text-align:center; font-weight:700; color:#6366f1; font-size:0.88em;">' + (i + 1) + '</span>' +
            '<input type="time" value="' + slot.start + '" ' +
            'style="padding:7px 10px; border:2px solid #c7d2fe; border-radius:6px; font-size:0.9em; font-weight:600;" ' +
            'onchange="updateSlot(' + i + ',\'start\',this.value)">' +
            '<span style="text-align:center; font-weight:700; color:#6366f1;">–</span>' +
            '<input type="time" value="' + slot.end + '" ' +
            'style="padding:7px 10px; border:2px solid #c7d2fe; border-radius:6px; font-size:0.9em; font-weight:600;" ' +
            'onchange="updateSlot(' + i + ',\'end\',this.value)">' +
            '<select onchange="updateSlot(' + i + ',\'type\',this.value)" ' +
            'style="padding:7px 10px; border:2px solid #c7d2fe; border-radius:6px; font-size:0.88em; font-weight:600;">' +
            '<option value="Lecture"' + (slot.type === 'Lecture' ? ' selected' : '') + '>📖 Lecture</option>' +
            '<option value="Lab"' + (slot.type === 'Lab' ? ' selected' : '') + '>🔬 Lab</option>' +
            '<option value="Practical"' + (slot.type === 'Practical' ? ' selected' : '') + '>⚙️ Practical</option>' +
            '<option value="Tutorial"' + (slot.type === 'Tutorial' ? ' selected' : '') + '>📝 Tutorial</option>' +
            '<option value="Lunch"' + (slot.type === 'Lunch' ? ' selected' : '') + '>☕ Lunch</option>' +
            '</select>' +
            '<button onclick="deleteSlot(' + i + ')" ' +
            'style="background:#ef4444; color:#fff; border:none; border-radius:6px; width:32px; height:32px; font-size:1.1em; cursor:pointer;">✕</button>' +
            '</div>';
    });

    container.innerHTML = html;
}

function updateSlot(index, field, value) {
    DEFAULT_SLOTS[index][field] = value;
}

function addSlot() {
    var last = DEFAULT_SLOTS[DEFAULT_SLOTS.length - 1];
    DEFAULT_SLOTS.push({ start: last.end, end: last.end, type: 'Lecture' });
    renderSlotEditor(DEFAULT_SLOTS);
}

function removeSlot() {
    if (DEFAULT_SLOTS.length > 1) {
        DEFAULT_SLOTS.pop();
        renderSlotEditor(DEFAULT_SLOTS);
    }
}

function deleteSlot(index) {
    if (DEFAULT_SLOTS.length > 1) {
        DEFAULT_SLOTS.splice(index, 1);
        renderSlotEditor(DEFAULT_SLOTS);
    }
}
// ─── HELPER FUNCTIONS ────────────────────────────────

function formatTime(hhmm) {
    var parts = hhmm.split(':');
    var h = parseInt(parts[0], 10);
    var m = parts[1];
    var ampm = h >= 12 ? 'PM' : 'AM';
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return h + ':' + m + ' ' + ampm;
}

function getSessionClass(type) {
    var t = (type || '').toLowerCase();
    if (t === 'lab') return 'session-lab';
    if (t === 'lecture' || t === 'theory') return 'session-theory';
    if (t === 'practical') return 'session-practical';
    if (t === 'tutorial') return 'session-tutorial';
    return 'session-default';
}

function shuffleArray(array) {
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function generateTimetable() {

    console.log("Generate clicked ✅");

    var TEACHER_USAGE = {};
    var ROOM_USAGE = {};

    var collegeName = document.getElementById('collegeName').value.trim();
    var className = document.getElementById('className').value.trim();
    var semester = document.getElementById('semester').value;
    var classroomsInput = document.getElementById('classrooms').value.trim();
    var workingDays = parseInt(document.getElementById('workingDays').value);

    if (!collegeName || !className || !semester || !classroomsInput) {
        alert('⚠️ Fill all fields');
        return;
    }

    // ✅ Classrooms
    var classrooms = classroomsInput.split(',')
        .map(s => s.trim())
        .filter(s => s);

    // ✅ Days
    var days = workingDays === 5
        ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // ✅ Slots (excluding lunch)
    var lectureSlots = DEFAULT_SLOTS.filter(slot => slot.type !== 'Lunch');

    // ✅ Initialize timetable
    var ALL_YEAR_TIMETABLE = { SE: {}, TE: {}, BE: {} };

    ["SE", "TE", "BE"].forEach(function (year) {
        days.forEach(function (day) {
            ALL_YEAR_TIMETABLE[year][day] = [];
        });
    });

    // ================= GENERATION =================

    days.forEach(function (day) {

        var dayIndex = days.indexOf(day);

        // 🔥 Alternate lab timing
        var labStartSlot = (dayIndex % 2 === 0) ? 0 : 4;

        for (var i = 0; i < lectureSlots.length; i++) {

            var key = day + "_" + i;

            if (!TEACHER_USAGE[key]) TEACHER_USAGE[key] = [];
            if (!ROOM_USAGE[key]) ROOM_USAGE[key] = [];

            ["SE", "TE", "BE"].forEach(function (year) {

                var pairs = (YEAR_DATA[year] || []).filter(p => p.subject && p.teacher);

                if (pairs.length === 0) {
                    ALL_YEAR_TIMETABLE[year][day].push({
                        subject: "-",
                        teacher: "-",
                        classroom: "-"
                    });
                    return;
                }

                var shuffledPairs = shuffleArray(pairs);

                // ✅ Select non-conflicting teacher
                var pair = shuffledPairs.find(p =>
                    !TEACHER_USAGE[key].includes(p.teacher)
                ) || shuffledPairs[0];

                // ✅ Room selection
                var availableRooms = classrooms.filter(room => {

                    if (pair.type === "Lab") {
                        return room.toLowerCase().includes("lab") && !ROOM_USAGE[key].includes(room);
                    }

                    return !room.toLowerCase().includes("lab") && !ROOM_USAGE[key].includes(room);
                });

                if (availableRooms.length === 0) {
                    availableRooms = classrooms.filter(r => !ROOM_USAGE[key].includes(r));
                }

                var room = availableRooms[0] || "N/A";
                ROOM_USAGE[key].push(room);

                var isLabSlot = (i === labStartSlot);

                // ================= LAB =================
                if (isLabSlot) {

                    var labSubjects = shuffledPairs.filter(p => p.type === "Lab");
                    if (labSubjects.length === 0) labSubjects = [pair];

                    var labText = '<div style="font-size:12px; text-align:left;">';

                    BATCHES.forEach((batch, index) => {

                        var labPair = labSubjects.find(p =>
                            !TEACHER_USAGE[key].includes(p.teacher)
                        ) || labSubjects[index % labSubjects.length];

                        labText += '<div><b>' + year + '-' + (index + 1) + '</b> : ';
                        labText += labPair.subject + ' ';
                        labText += '<span style="color:#555;">(' + labPair.teacher + ')</span></div>';

                        TEACHER_USAGE[key].push(labPair.teacher);
                    });

                    labText += '</div>';

                    // 🔥 ADD 2-HOUR LAB
                    ALL_YEAR_TIMETABLE[year][day].push({
                        subject: labText,
                        teacher: "Lab",
                        classroom: room
                    });

                    ALL_YEAR_TIMETABLE[year][day].push({
                        subject: labText,
                        teacher: "Lab",
                        classroom: room
                    });

                } else {

                    // ================= LECTURE =================
                    TEACHER_USAGE[key].push(pair.teacher);

                    ALL_YEAR_TIMETABLE[year][day].push({
                        subject: pair.subject,
                        teacher: pair.teacher,
                        classroom: room
                    });
                }

            });

            // 🔥 Skip next slot if lab placed
            if (i === labStartSlot) {
                i++;
            }
        }

    });

    // ================= UI =================

    var html = '';
    html += '<h2 style="text-align:center;">📅 Department Timetable</h2>';
    html += '<table border="1" style="width:100%; border-collapse:collapse; text-align:center;">';

    html += '<tr><th>DAY</th><th>YEAR</th>';

    DEFAULT_SLOTS.forEach(slot => {
        html += '<th>' + formatTime(slot.start) + '<br>' + formatTime(slot.end) + '</th>';
    });

    html += '</tr>';

    days.forEach(function (day) {

        ["SE", "TE", "BE"].forEach(function (year, index) {

            html += '<tr>';

            if (index === 0) {
                html += '<td rowspan="3">' + day + '</td>';
            }

            html += '<td>' + year + '</td>';

            var lectureIndex = 0;

            DEFAULT_SLOTS.forEach(function (slot) {

                if (slot.type === 'Lunch') {

                    if (index === 0) {
                        html += '<td rowspan="3">🍽️ LUNCH</td>';
                    }

                } else {

                    var item = ALL_YEAR_TIMETABLE[year][day][lectureIndex];

                    html += '<td>';

                    if (item) {

                        html += item.subject + '<br>';

                        if (item.teacher !== "Lab") {
                            html += item.teacher + '<br>';
                        }

                        html += '<span style="color:#16a34a;">' + item.classroom + '</span>';

                    } else {
                        html += '-';
                    }

                    html += '</td>';

                    lectureIndex++;
                }

            });

            html += '</tr>';
        });

    });

    html += '</table>';

    document.getElementById('timetableDisplay').innerHTML = html;

    // ✅ Save for DB
    window.LAST_TIMETABLE = {
        collegeName: collegeName,
        className: className,
        semester: semester,
        timetable: ALL_YEAR_TIMETABLE
    };

    console.log("Timetable Generated ✅", window.LAST_TIMETABLE);
}
function loadDemo() {

    // Demo basic details
    document.getElementById('collegeName').value = "IOT Department";
    document.getElementById('className').value = "SE";
    document.getElementById('semester').value = "6";
    document.getElementById('classrooms').value = "Room 101,Room 102,Lab 1";
    document.getElementById('workingDays').value = "5";

    // Demo subject-teacher for ALL years
    YEAR_DATA = {
        SE: [
            { subject: 'IOT', teacher: 'Prof. A', type: 'Lecture' },
            { subject: 'CNS', teacher: 'Prof. B', type: 'Lab' }
        ],
        TE: [
            { subject: 'DBMS', teacher: 'Prof. C', type: 'Lecture' },
            { subject: 'OS', teacher: 'Prof. D', type: 'Lab' }
        ],
        BE: [
            { subject: 'AI', teacher: 'Prof. E', type: 'Lecture' },
            { subject: 'ML', teacher: 'Prof. F', type: 'Lab' }
        ]
    };

    // Load current year data
    SUBJECT_TEACHER_PAIRS = JSON.parse(JSON.stringify(YEAR_DATA[currentYear]));

    // Reset slots also
    DEFAULT_SLOTS = [
        { start: '09:30', end: '10:30', type: 'Lecture' },
        { start: '10:30', end: '11:30', type: 'Lecture' },
        { start: '11:30', end: '12:30', type: 'Lecture' },
        { start: '12:30', end: '01:00', type: 'Lunch' },
        { start: '01:00', end: '03:00', type: 'lab' },

        { start: '03:00', end: '04:00', type: 'lecture' },
        { start: '04:00', end: '05:00', type: '' }
    ];

    renderPairEditor();
    renderSlotEditor(DEFAULT_SLOTS);

    alert("✅ Demo Loaded Successfully!");
}
function resetAll() {

      console.log("Reset Clicked"); // 👈 check console
    // ✅ Clear input fields
    document.getElementById('collegeName').value = '';
    document.getElementById('className').value = '';
    document.getElementById('semester').value = '';
    document.getElementById('classrooms').value = '';
    document.getElementById('workingDays').value = '5';

    // ✅ Reset year data (IMPORTANT)
    YEAR_DATA = {
        SE: [],
        TE: [],
        BE: []
    };

    currentYear = "SE";
    SUBJECT_TEACHER_PAIRS = [];

    // ✅ Reset slots (DO NOT EMPTY ARRAY ❌)
    DEFAULT_SLOTS = [
        { start: '09:30', end: '10:30', type: 'Lecture' },
        { start: '10:30', end: '11:30', type: 'Lecture' },
        { start: '11:30', end: '12:30', type: 'Lecture' },
        { start: '12:30', end: '01:00', type: 'Lunch' },
        { start: '01:00', end: '02:00', type: 'Lecture' },
        { start: '02:00', end: '03:00', type: 'Lecture' },
        { start: '03:00', end: '04:00', type: 'Lab' },
        { start: '04:00', end: '05:00', type: 'Lab' }
    ];

    // ✅ Re-render UI
    renderPairEditor();
    renderSlotEditor(DEFAULT_SLOTS);

    // ✅ Clear timetable output
    document.getElementById('timetableDisplay').innerHTML = '';

    // ✅ Switch back to subject section
    document.getElementById("subjectSection").style.display = "block";
    document.getElementById("slotSection").style.display = "none";

    // ✅ Reset active button UI
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // Activate SE button
    document.querySelector(".nav-btn").classList.add("active");

    alert("🔄 Reset Successfully!");
}

function printTimetable() {

    var content = document.getElementById("timetableDisplay").innerHTML;

    var win = window.open('', '', 'width=1200,height=800');

    win.document.write(`
        <html>
        <head>
            <title>Print Timetable</title>
            <style>

                body {
                    font-family: Arial;
                    padding: 20px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                    page-break-inside: avoid; /* 🔥 important */
                }

                th, td {
                    border: 1px solid #000;
                    padding: 6px;
                    text-align: center;
                    font-size: 12px;
                }

                th {
                    background: #6366f1;
                    color: white;
                }

                h2 {
                    text-align: center;
                    margin-top: 30px;
                    page-break-before: auto;
                }

                /* 🔥 Force page break after each table */
                .timetable-wrapper table {
                    page-break-after: always;
                }

                /* Remove last page blank */
                .timetable-wrapper table:last-child {
                    page-break-after: auto;
                }

                @media print {
                    body {
                        zoom: 85%; /* adjust size */
                    }
                }

            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);

    win.document.close();
    win.focus();
    win.print();
}
function downloadPDF() {

    var element = document.getElementById("timetableDisplay");

    if (!element || element.innerHTML.trim() === "") {
        alert("⚠️ Generate timetable first!");
        return;
    }

    // 🔥 clone element (important fix)
    var clone = element.cloneNode(true);

    // remove problematic styles
    clone.style.zoom = "100%";
    clone.style.padding = "10px";
    clone.style.background = "#ffffff";

    document.body.appendChild(clone);

    var opt = {
        margin: 0.3,
        filename: 'Timetable.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'landscape'
        }
    };

    html2pdf().set(opt).from(clone).save().then(() => {
        document.body.removeChild(clone); // cleanup
    });
}

fetch("http://localhost:5000/save", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        collegeName: collegeName,
        className: className,
        semester: semester,
        timetable: ALL_YEAR_TIMETABLE
    })
})
.then(res => res.json())
.then(data => console.log("Saved:", data))
.catch(err => console.error(err));

function loadFromDB() {
    fetch("http://localhost:5000/get")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("Data Loaded from DB");
    });
}
function loadFromDB() {
    fetch("http://localhost:5000/get")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("✅ Data Loaded");
    })
    .catch(err => {
        console.log(err);
        alert("❌ Error loading");
    });
}
function downloadJSON() {

    const data = {
        YEAR_DATA: YEAR_DATA,
        SLOTS: DEFAULT_SLOTS
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "timetable.json";
    link.click();
    
}
function saveTimetable() {

    if (!window.LAST_TIMETABLE) {
        alert("⚠️ First generate timetable!");
        return;
    }

    fetch("http://localhost:5000/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(window.LAST_TIMETABLE)
    })
    .then(res => res.text())
    .then(data => {
        alert("✅ Saved to Database");
        console.log(data);
    })
    .catch(err => {
        console.log(err);
        alert("❌ Error saving");
    });
}