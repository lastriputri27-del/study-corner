import { useState } from "react";
import "./App.css";

function App() {
  // Lampu
  const [lampOn, setLampOn] = useState(false);

  // Laptop
  const [laptopOpen, setLaptopOpen] = useState(false);

  // Pesan berhasil
  const [savedMessage, setSavedMessage] = useState(false);

  // Jadwal yang tersimpan
  const [savedSchedule, setSavedSchedule] = useState(null);

  // Form
  const [form, setForm] = useState({
    subject: "",
    date: "",
    time: "",
    activity: "",
  });

  // =========================
  // LAMPU
  // =========================
  const handleLampClick = () => {
    const newLampState = !lampOn;

    setLampOn(newLampState);

    // Kalau lampu dimatikan, laptop ikut tertutup
    if (!newLampState) {
      setLaptopOpen(false);
    }
  };

  // =========================
  // FORM
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // PILIH KEGIATAN
  // =========================
  const selectActivity = (activity) => {
    setForm({
      ...form,
      activity,
    });
  };

  // =========================
  // BUKA LAPTOP
  // =========================
  const openLaptop = () => {
    if (!lampOn) return;

    setLaptopOpen(true);
    setSavedMessage(false);
  };

  // =========================
  // SIMPAN JADWAL
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.subject ||
      !form.date ||
      !form.time ||
      !form.activity
    ) {
      alert("Silakan lengkapi semua data.");
      return;
    }

    // Simpan jadwal
    setSavedSchedule({
      subject: form.subject,
      date: form.date,
      time: form.time,
      activity: form.activity,
    });

    // Tampilkan pesan berhasil
    setSavedMessage(true);

    // Setelah 1,5 detik laptop ditutup
    setTimeout(() => {
      setSavedMessage(false);
      setLaptopOpen(false);
    }, 1500);

    // Kosongkan form
    setForm({
      subject: "",
      date: "",
      time: "",
      activity: "",
    });
  };

  // =========================
  // FORMAT TANGGAL
  // =========================
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // =========================
  // HAPUS JADWAL
  // =========================
  const deleteSchedule = () => {
    setSavedSchedule(null);
  };

  return (
    <main
      className={`room ${
        lampOn ? "lamp-on" : "lamp-off"
      }`}
    >

      {/* =========================
          DINDING
      ========================= */}
      <div className="wall">

        <div className="window">
          <div className="moon">☾</div>

          <div className="star star1">✦</div>
          <div className="star star2">✦</div>
          <div className="star star3">✦</div>
        </div>

        <div className="wall-title">
          <h1>Study Desk</h1>
          <p>Study Planner</p>
        </div>

      </div>


      {/* =========================
          CAHAYA LAMPU
      ========================= */}
      <div
        className={`light-effect ${
          lampOn ? "active" : ""
        }`}
      ></div>


      {/* =========================
          MEJA
      ========================= */}
      <div className="desk"></div>


      {/* =========================
          AREA MEJA
      ========================= */}
      <div className="desk-scene">

        {/* =========================
            LAMPU
        ========================= */}
        <div
          className={`lamp ${
            lampOn ? "on" : "off"
          }`}
          onClick={handleLampClick}
          title="Klik untuk menyalakan lampu"
        >
          <div className="lamp-head"></div>
          <div className="lamp-neck"></div>
          <div className="lamp-base"></div>
        </div>


        {/* =========================
            LAPTOP
        ========================= */}
        <div
          className={`laptop ${
            lampOn ? "ready" : "disabled"
          } ${
            laptopOpen ? "active" : ""
          }`}
          onClick={
            !laptopOpen
              ? openLaptop
              : undefined
          }
        >

          {/* LAYAR */}
          <div className="screen-frame">

            <div className="screen">

              {/* LAPTOP MATI */}
              {!lampOn ? (

                <div className="screen-off">
                  <span>●</span>
                </div>

              ) : !laptopOpen ? (

                /* LAPTOP HOME */
                <div className="screen-home">

                  <div className="screen-icon">
                    ▣
                  </div>

                  <h2>
                    Study Planner
                  </h2>

                  <p>
                    Klik untuk buat jadwal
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLaptop();
                    }}
                  >
                    Buat Jadwal
                  </button>

                </div>

              ) : (

                /* FORM JADWAL */
                <div className="planner">

                  <div className="planner-header">

                    <div>
                      <span>
                        STUDY PLANNER
                      </span>

                      <h2>
                        Buat Jadwal
                      </h2>
                    </div>

                    <button
                      className="close-btn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLaptopOpen(false);
                      }}
                    >
                      ×
                    </button>

                  </div>


                  <form
                    className="study-form"
                    onSubmit={handleSubmit}
                  >

                    {/* MATA KULIAH */}
                    <div className="form-group">

                      <label>
                        Mata Kuliah
                      </label>

                      <input
                        type="text"
                        name="subject"
                        placeholder="Contoh: Pemrograman Web"
                        value={form.subject}
                        onChange={handleChange}
                      />

                    </div>


                    {/* TANGGAL & WAKTU */}
                    <div className="form-row">

                      <div className="form-group">

                        <label>
                          Tanggal
                        </label>

                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                        />

                      </div>


                      <div className="form-group">

                        <label>
                          Waktu
                        </label>

                        <input
                          type="time"
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                        />

                      </div>

                    </div>


                    {/* KEGIATAN */}
                    <div className="form-group">

                      <label>
                        Kegiatan
                      </label>

                      <div className="activity-options">

                        <button
                          type="button"
                          className={
                            form.activity === "Belajar"
                              ? "activity-btn active"
                              : "activity-btn"
                          }
                          onClick={() =>
                            selectActivity("Belajar")
                          }
                        >
                          📖 Belajar
                        </button>


                        <button
                          type="button"
                          className={
                            form.activity ===
                            "Mengerjakan Tugas"
                              ? "activity-btn active"
                              : "activity-btn"
                          }
                          onClick={() =>
                            selectActivity(
                              "Mengerjakan Tugas"
                            )
                          }
                        >
                          📝 Tugas
                        </button>


                        <button
                          type="button"
                          className={
                            form.activity ===
                            "Review Materi"
                              ? "activity-btn active"
                              : "activity-btn"
                          }
                          onClick={() =>
                            selectActivity(
                              "Review Materi"
                            )
                          }
                        >
                          🔎 Review
                        </button>


                        <button
                          type="button"
                          className={
                            form.activity ===
                            "Persiapan Ujian"
                              ? "activity-btn active"
                              : "activity-btn"
                          }
                          onClick={() =>
                            selectActivity(
                              "Persiapan Ujian"
                            )
                          }
                        >
                          🎯 Ujian
                        </button>

                      </div>

                    </div>


                    {/* SIMPAN */}
                    <button
                      className="submit-btn"
                      type="submit"
                    >
                      Simpan Jadwal
                    </button>

                  </form>


                  {/* PESAN BERHASIL */}
                  {savedMessage && (
                    <div className="success-message">

                      <strong>
                        ✓ Jadwal tersimpan
                      </strong>

                    </div>
                  )}

                </div>

              )}

            </div>

          </div>


          {/* KEYBOARD */}
          <div className="keyboard">

            {Array.from({
              length: 42,
            }).map((_, index) => (
              <span key={index}></span>
            ))}

          </div>


          <div className="laptop-bottom"></div>

        </div>

      </div>


      {/* =========================
          STICKY NOTE JADWAL
      ========================= */}
      {savedSchedule && (
        <div className="sticky-note">

          <div className="pin"></div>

          <button
            className="delete-note"
            onClick={deleteSchedule}
            title="Hapus jadwal"
          >
            ×
          </button>

          <span className="note-title">
            STUDY SCHEDULE
          </span>

          <strong>
            {savedSchedule.subject}
          </strong>

          <div className="note-info">
            📅 {formatDate(savedSchedule.date)}
          </div>

          <div className="note-info">
            ⏰ {savedSchedule.time}
          </div>

          <div className="note-info">
            📝 {savedSchedule.activity}
          </div>

        </div>
      )}


      {/* =========================
          PETUNJUK LAMPU
      ========================= */}
      {!lampOn && (
        <div className="lamp-hint">
          Klik lampu untuk mulai
        </div>
      )}


      {/* =========================
          PETUNJUK LAPTOP
      ========================= */}
      {lampOn && !laptopOpen && (
        <div className="laptop-hint">
          Klik laptop untuk membuat jadwal
        </div>
      )}

    </main>
  );
}

export default App;