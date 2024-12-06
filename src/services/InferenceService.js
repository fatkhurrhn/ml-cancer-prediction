const tf = require("@tensorflow/tfjs-node");

const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    console.log("score: ", score);
    console.log("confidenceScore: ", confidenceScore);

    // Model akan mengembalikan array dengan rentang nilai 0 hingga 1. Di mana jika rentang nilainya di atas 50% diklasifikasikan sebagai Cancer, jika di bawah atau sama dengan 50% diklasifikasikan sebagai Non-cancer.
    const label = confidenceScore > 50 ? "Cancer" : "Non-cancer";

    let suggestion;

    if (label === "Cancer") {
      suggestion =
        "Bersabar, jangan panik. Segera periksakan diri ke dokter untuk mendapatkan penanganan lebih lanjut.";
    } else {
      suggestion =
        "Tetap jaga kesehatan dan pola hidup sehat. Jangan lupa untuk rutin periksa kesehatan.";
    }

    return {
      confidenceScore,
      label,
      suggestion: suggestion,
    };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
}

module.exports = predictClassification;
