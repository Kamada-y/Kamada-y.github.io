(() => {
  'use strict';

  const areaSelect = document.getElementById('areaSelect');
  const chartTitle = document.getElementById('chartTitle');
  const updateTime = document.getElementById('updateTime');
  const coldestAlert = document.getElementById('coldestAlert');
  const coldestText = document.getElementById('coldestText');
  const errorBox = document.getElementById('errorBox');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const canvas = document.getElementById('tempChart');

  let tempChartInstance = null;

  /**
   * 日付文字列 (ISO8601) を "M/D(曜)" 形式に整形
   */
  function formatDateLabel(isoString) {
    const date = new Date(isoString);
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${month}/${day}(${weekday})`;
  }

  /**
   * 最低気温に応じた服装アドバイスを返す
   */
  function getClothingAdvice(minTemp) {
    if (minTemp <= 5) {
      return 'ダウンコートや厚手のウールコート、マフラー・手袋でしっかり防寒しましょう。';
    } else if (minTemp <= 10) {
      return '冬物コートやジャケットに、ニット・セーターを重ねるのがおすすめです。';
    } else if (minTemp <= 15) {
      return 'トレンチコートやブルゾン、カーディガンなど羽織るものがあると安心です。';
    } else if (minTemp <= 20) {
      return '長袖シャツや薄手のスウェットで快適に過ごせます。';
    } else {
      return '半袖や薄手の長袖など、軽装で問題ありません。';
    }
  }

  /**
   * 気象庁JSONデータから週間気温と発表元情報を抽出
   */
  function parseJmaWeeklyData(jsonData) {
    // 週間予報は通常配列の2番目 (index 1) に格納されている
    const weeklyReport = jsonData[1];
    if (!weeklyReport || !weeklyReport.timeSeries) {
      throw new Error('週間予報データが見つかりませんでした。');
    }

    // 気温データを含む timeSeries を検索 (tempsMin / tempsMax を持つ要素)
    const tempSeries = weeklyReport.timeSeries.find(
      (series) => series.areas && series.areas[0] && 'tempsMin' in series.areas[0]
    );

    if (!tempSeries) {
      throw new Error('気温データの解析に失敗しました。');
    }

    const timeDefines = tempSeries.timeDefines;
    const areaData = tempSeries.areas[0];
    const areaName = areaData.area.name;

    // 空文字 "" はデータなし（当日分など）のため null に変換
    const tempsMax = areaData.tempsMax.map((val) => (val === '' || val === null ? null : Number(val)));
    const tempsMin = areaData.tempsMin.map((val) => (val === '' || val === null ? null : Number(val)));
    const labels = timeDefines.map(formatDateLabel);

    return {
      reportDatetime: weeklyReport.reportDatetime,
      areaName,
      labels,
      tempsMax,
      tempsMin
    };
  }

  /**
   * いちばん寒い日を特定して表示更新 (Nice機能)
   */
  function updateColdestDayInfo(labels, tempsMin, tempsMax) {
    let coldestIndex = -1;
    let lowestMin = Infinity;

    for (let i = 0; i < tempsMin.length; i++) {
      const minVal = tempsMin[i];
      if (minVal !== null && !Number.isNaN(minVal)) {
        if (minVal < lowestMin) {
          lowestMin = minVal;
          coldestIndex = i;
        } else if (minVal === lowestMin && coldestIndex !== -1) {
          // 最低気温が同じ場合は、最高気温がより低い方を優先
          const currentMax = tempsMax[i] ?? Infinity;
          const prevMax = tempsMax[coldestIndex] ?? Infinity;
          if (currentMax < prevMax) {
            coldestIndex = i;
          }
        }
      }
    }

    if (coldestIndex === -1) {
      coldestText.textContent = '有効な最低気温データが取得できませんでした。';
      return;
    }

    const dayLabel = labels[coldestIndex];
    const maxStr = tempsMax[coldestIndex] !== null ? `${tempsMax[coldestIndex]}℃` : '--';
    const advice = getClothingAdvice(lowestMin);

    coldestText.innerHTML = `
      <div class="fw-bold mb-1">
        🥶 いちばん寒い日：${dayLabel}（最低 <span class="text-primary">${lowestMin}℃</span> / 最高 <span class="text-danger">${maxStr}</span>）
      </div>
      <div class="text-dark">${advice}</div>
    `;
  }

  /**
   * Chart.js で折れ線グラフを描画・再描画
   */
  function renderTemperatureChart(labels, tempsMax, tempsMin) {
    // すでにグラフが存在する場合は破棄して描き直す
    if (tempChartInstance) {
      tempChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    tempChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '最高気温 (℃)',
            data: tempsMax,
            borderColor: '#dc3545',
            backgroundColor: 'rgba(220, 53, 69, 0.12)',
            pointBackgroundColor: '#dc3545',
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.2,
            spanGaps: true
          },
          {
            label: '最低気温 (℃)',
            data: tempsMin,
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.12)',
            pointBackgroundColor: '#0d6efd',
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.2,
            spanGaps: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 16
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const val = context.parsed.y;
                return val !== null ? `${context.dataset.label}: ${val}℃` : `${context.dataset.label}: データなし`;
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: '気温 (℃)'
            },
            ticks: {
              callback: (value) => `${value}℃`
            },
            suggestedMin: 0,
            suggestedMax: 25
          }
        }
      }
    });
  }

  /**
   * 指定された地域コードの気象庁JSONを取得して画面を更新
   */
  async function loadForecast(areaCode) {
    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCode}.json`;

    errorBox.classList.add('d-none');
    loadingSpinner.classList.remove('d-none');
    canvas.style.opacity = '0.3';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`データ取得エラー (HTTP ${response.status})`);
      }

      const jsonData = await response.json();
      const parsed = parseJmaWeeklyData(jsonData);

      // 見出し・発表時刻の更新（都道府県名と観測地点名が重複しないように整形）
      const selectedOptionText = areaSelect.options[areaSelect.selectedIndex].text;
      const prefName = selectedOptionText.split('（')[0];
      chartTitle.textContent = `${prefName}（${parsed.areaName}）の週間気温`;

      const reportDate = new Date(parsed.reportDatetime);
      updateTime.textContent = `${reportDate.getMonth() + 1}/${reportDate.getDate()} ${String(reportDate.getHours()).padStart(2, '0')}:00 発表`;

      // いちばん寒い日・グラフの更新
      updateColdestDayInfo(parsed.labels, parsed.tempsMin, parsed.tempsMax);
      renderTemperatureChart(parsed.labels, parsed.tempsMax, parsed.tempsMin);

    } catch (err) {
      errorBox.textContent = `予報データの読み込みに失敗しました：${err.message}`;
      errorBox.classList.remove('d-none');
      coldestText.textContent = 'データを取得できませんでした。';
    } finally {
      loadingSpinner.classList.add('d-none');
      canvas.style.opacity = '1';
    }
  }

  // 地域セレクト変更時に再描画
  areaSelect.addEventListener('change', (event) => {
    loadForecast(event.target.value);
  });

  // 初期表示（東京: 130000）
  document.addEventListener('DOMContentLoaded', () => {
    loadForecast(areaSelect.value);
  });
})();