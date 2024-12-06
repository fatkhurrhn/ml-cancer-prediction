const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
    return tf.loadGraphModel('https://storage.googleapis.com/storage-cancer-prediction/model.json');
}
module.exports = loadModel;