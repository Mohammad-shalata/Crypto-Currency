"use strict";
function canvasAjax() {
    const myCoinsArr = JSON.parse(localStorage.getItem("ajaxCoins"));
    const strAjax = coinsForAjax(myCoinsArr);
    let tmpObj = new Object();
    let ajax = getAjax(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${strAjax}&tsyms=USD`,
        success => {
            // if no value for the coin throw error and stop the js .
            if (success.Response === "Error") {
                $(".pageContent").html(`<h1 class="text-center bg-danger">Please select up to 5 coins to display on the graph!</h1>`);
            }
            for (let item of myCoinsArr) {
                let tmpArr = new Array();
                // for coins without value show massage .
                if (success[item] === undefined) {
                    const msg = `<div class="alert alert-danger text-center" role = "alert" >
                        ${item} have no value !
                </div>` ;
                    $(".pageContent").prepend(msg);
                    // continue for not show error msg in console .
                    continue;
                }
                // push all to tmp obj and then push obj to tmp arr .
                tmpObj = { x: new Date(), y: success[item].USD };
                tmpArr.push(tmpObj);
                let tmpChartOption = { type: "line", name: item, color: randomColor(), axisYIndex: 0, showInLegend: true, dataPoints: tmpArr };
                chart.options.data.push(tmpChartOption);
            }
            chart.render();
        });
    setInterval(() => {
        getAjax(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${strAjax}&tsyms=USD`,
            success => {
                for (let i = 0; i < chart.options.data.length; i++) {
                    for (let item of myCoinsArr) {
                        if (chart.options.data[i].name === item) {
                            let tmpArr = new Array();
                            tmpObj = { x: new Date(), y: success[item].USD };
                            tmpArr.push(tmpObj);
                            chart.options.data[i].dataPoints.push(tmpObj);
                        }
                    }
                }
                chart.render();
            });
    }, 2000);
    const chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Real-time Price of Selected CryptoCurrencies in $USD"
        },
        toolTip: {
            shared: true
        },
        axisY: [{
            title: "Coins Value",
            suffix: "$",
            lineColor: "black",
            tickColor: "black",
            labelFontColor: "black",
            titleFontColor: "black",
        }],
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemClick: toggleDataSeries
        },
        data: []
    });
}
function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

function coinsForAjax(obj) {
    let tmp = '';
    for (let item of obj) {
        tmp += item + ",";
    }
    return tmp.substring(0, tmp.length - 1);
}

function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + b + ',' + g + ')';
}
