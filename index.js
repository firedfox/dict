const {
  state,
  tags: { a, button, div, li, p, span, table, tbody, td, th, thead, tr, ul },
} = van;

/**
 * 语音朗读英文文本
 * @param {string} text 英文文本
 */
const pronounceEnglishText = text => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

/**
 * 从csv文件加载词典，返回词典数组
 * @returns {Promise<[english: string, chinese: string][]>}
 */
const loadDictCsv = async () => {
  const dictCsv = await fetch('dict.csv');
  const dictText = await dictCsv?.text();

  return dictText?.split('\n')?.map(line => {
    let sepIndex = line.indexOf(' ');

    if (sepIndex === -1) {
      sepIndex = line.split(/\b/)[0].length;
    }

    return [
      line.substring(0, sepIndex),
      line.substring(sepIndex + 1),
    ];
  });
};

/**
 * 渲染表格
 * @param {[english: string, chinese: string][]} dictArray 词典数组
 */
const renderTable = async (dictArray) => {
  const Hello = () => table(
    {
      class: 'dict-table',
      border: 1,
      cellpadding: 10,
    },
    thead(
      tr(['英文', '中文', '发音'].map(text => th(text)))
    ),
    tbody(
      dictArray.map(line =>
        tr(
          line.map(text => td(text)).concat(
            td(button({ onclick: () => pronounceEnglishText(line[0]) }, '🔊')),
          )
        )
      )
    ),
  );

  van.add(document.getElementById('app'), Hello());
};

/**
 * 初始化
 */
const init = async () => {
  const dictArray = await loadDictCsv();
  await renderTable(dictArray);
}

init();