import iconv from 'iconv-lite';

export function getRealEstateData(): string {
  'use server'

  fetch("https://www.qdfd.com.cn/qdweb/realweb/indexnew.jsp").then(res => {
    if (!res.ok) {
      console.error("Request failed.")
      return;
    }

    return res.arrayBuffer();
  }).then(arrayBuffer => {
    if (arrayBuffer === undefined) {
      console.error("Get response body error.");
      return;
    }

    let content = iconv.decode(Buffer.from(arrayBuffer), 'GBK');
    let match = getAllAreasRegex(true).exec(content);
    if (!match || match.length < 5) {
      console.error("Response body do not matched.");
      return;
    }

      console.log('住宅套数', match[1]);
      console.log('住宅面积', match[2]);
      console.log('总成交套数', match[3]);
      console.log('总成交面积', match[4]);
  })

  return 'hello';
}

function getAllAreasRegex(isNewHouse: boolean): RegExp {
  let type = isNewHouse ? '一手房今日成交' : '二手房今日成交';
  let template = `${type}<\/div>.*?<td class="quxian">全市<\/td>\\s*?<td class="you lv">(\\d+\\.?\\d*)<\/td>\\s*?<td class="you lv">(\\d+\\.?\\d*)<\/td>\\s*?<td class="you lv">(\\d+\\.?\\d*)<\/td>\\s*?<td class="you lv">(\\d+\\.?\\d*)<\/td>`;
  return new RegExp(template, 'gs');
}

function getAnyAreaRegex(isNewHouse: boolean, area: string): RegExp {
  let type = isNewHouse ? '一手房今日成交' : '二手房今日成交';
  let template = `${type}<\/div>.*?<td class="quxian">${area}<\/td>\\s*?<td class="you">(\\d+\\.?\\d*)<\/td>\\s*?<td class="you">(\\d+\\.?\\d*)<\/td>\\s*?<td class="you">(\\d+\\.?\\d*)<\/td>\\s*?<td class="you">(\\d+\\.?\\d*)<\/td>`;
  return new RegExp(template, 'gs');
}