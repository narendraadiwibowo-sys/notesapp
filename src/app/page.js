"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notesLS");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notesLS", JSON.stringify(notes));
  }, [notes]);

  const [showModal, setShowModal] = useState(false);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleEdit = (note) => {
    setJudul(note.judul);
    setIsi(note.isi);
    setSelectedId(note.id);
    setIsEdit(true);
    setShowModal(true);
  };

  // Saya tambahkan handleDelete di sini agar tidak error saat tombol ✕ diklik ya mas
  const handleDelete = (id) => {
    const confirmDelete = confirm("Apakah kamu yakin ingin menghapus catatan ini?");
    if (confirmDelete) {
      const filteredNotes = notes.filter((note) => note.id !== id);
      setNotes(filteredNotes);
    }
  };

  const simpanAnonimArrowFunction = (e) => {
    e.preventDefault();

    if (!judul || !isi) {
      alert("Judul dan isi wajib diisi!");
      return;
    }

    if (isEdit) {
      const updatedNotes = notes.map((note)=>
        note.id === selectedId ? {
          ...note,
          judul,
          isi
        } : note
      );

      setNotes(updatedNotes);

    } else {
      const newNotes = {
        id: Date.now(),
        judul,
        isi,
      }
      
      setNotes([...notes, newNotes]);
    }
  }

  const simpanExpressionFunction = function () {

  }

  function simpanDeclarative() {

  }

  const resetForm = () => {
    setJudul("");
    setIsi("");
    setSelectedId(null);
    setIsEdit(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white-200 to-cyan-400 p-8 text-black relative">
      <h1 className="text-center text-3xl font-bold mb-8">
        Aplikasi Notes
      </h1>

      <div className="max-w-xl mx-auto flex flex-col gap-4">
        {notes.length === 0 ? (
          <p className="text-center italic opacity-70">Belum ada catatan. Silakan tambah!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-white/50 p-4 rounded-xl flex justify-between items-center shadow-sm">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{note.judul}</h3>
                <p className="opacity-80">{note.isi}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(note)} 
                  className="cursor-pointer px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold transition-colors text-sm"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDelete(note.id)}
                  className="cursor-pointer px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Button tambah */}
      <button
        onClick={() => {
          resetForm();
          setShowModal(true)
        }}
        className="fixed bottom-6 right-6 bg-pink-500 text-white w-14 h-14 rounded-full text-2xl shadow-lg"
      >
        +
      </button>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
            <h2 className="mb-4 font-semibold text-lg">
              {isEdit ? "Edit Note" : "Note Baru"}
            </h2>

            <form onSubmit={simpanAnonimArrowFunction}>
              <input
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full p-2 mb-3 border rounded"
                placeholder="Judul"
              />

              <textarea
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Isi catatan..."
              />

              {/* Tombol */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 p-2 text-white bg-pink-500 rounded hover:bg-pink-600"
                >
                  {isEdit ? "Update" : "Save"}
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="flex-1 p-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
