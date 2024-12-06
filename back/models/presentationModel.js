const Redis = require('ioredis');
const redis = new Redis();

const PRESENTATIONS_KEY = 'presentations';


const loadPresentations = async () => {
  try {
    const data = await redis.get(PRESENTATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Erro ao carregar as apresentações do Redis:', err);
    return [];
  }
};


const savePresentations = async (presentations) => {
  try {
    await redis.set(PRESENTATIONS_KEY, JSON.stringify(presentations));
  } catch (err) {
    console.error('Erro ao salvar as apresentações no Redis:', err);
  }
};


let presentations = [];

loadPresentations().then((data) => {
  presentations = data;
});

module.exports = {
  getPresentations: () => presentations,

  addPresentation: async (presentation) => {
    presentations.push(presentation);
    await savePresentations(presentations);
  },

  updatePresentation: async (id, updatedPresentation) => {
    presentations = presentations.map((p) =>
      p.id === id ? { ...p, ...updatedPresentation } : p
    );
    await savePresentations(presentations);
  },

  deletePresentation: async (id) => {
    presentations = presentations.filter((p) => p.id !== id);
    await savePresentations(presentations);
  },
};
