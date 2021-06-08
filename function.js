"use strict";
// function for use ajax
function getAjax(url, response) {
    $.ajax({
        method: "GET",
        url: url,
        success: response,
        error: err => alert(err.massage)
    });
}
// ---- New info (button) function --- ///
function setNewInfo(id, name) {
    try {
        const objStorage = localStorage.getItem(name);
        if (objStorage === null) {
            // set timer for 2 minutes to clear data from storage.
            setTimeout(() => {
                localStorage.removeItem(name);
            }, 120000);
            // get data from ajax and print to html
            getAjax("https://api.coingecko.com/api/v3/coins/" + id, success => {
                const updateData = `
        <img src="${success.image.small}"/>
        <p>${success.market_data.current_price.usd} $</p>
        <p>${success.market_data.current_price.eur} €</p>
        <p>${success.market_data.current_price.ils} ₪</p>
        `;
                $(`#${name}`).html(updateData);
                localStorage.setItem(name, updateData);
            });
        } else {
            // get data from localStorage .
            const oldData = localStorage.getItem(name);
            $(`#${name}`).html(oldData);
        }
    } catch (error) {
        alert(error.massage);
    }
}
/// ------ Switch Functions --- ////
function switchFun(switchId) {
    try {
        let checkedBoxes = $("input:checked");
        let appendCoins = "";

        if (checkedBoxes.length >= 6) {
            $("#" + switchId).prop("checked", false);
            // update var becuase it include last switch .
            checkedBoxes = $("input:checked");
            for (const item of checkedBoxes) {
                let coin = `
            <button type="button" class="btn btn-dark" onclick="removeSelectedCoin($(this).text(),${switchId})">${item.name}</button>
            ` ;
                appendCoins += coin;
            }
            let h3Modal = `
        <h3>You can chooes only 5 coins, Please select coin to replace </h3>
        ` ;
        // append modal to body and write html to his body , then show him .
            $("body").append(addModal());
            $(".modal-body").html(h3Modal + appendCoins);
            $("#myModal").modal();
        }
    } catch (error) {
        alert(error.massage);
    }
}
// remove and replace coins .
function removeSelectedCoin(coin, newCoin) {
    $(`input[name="${coin}"]`).prop("checked", false);
    $("#" + newCoin.id).prop("checked", true);
    $("#myModal").modal("hide");
}
// -------------------------------------------------- ////
function createCoinCard(symbol, name, divId, id) {
    const card = `
    <div class="card col-sm-4 col-md-4 ${symbol}" id="coinsCards">
    <div class="card-body">
    <div class="custom-control custom-switch" id="mySwitch">
    <input type="checkbox" class="custom-control-input" name="${symbol}" id="${'switch' + divId}" onclick="switchFun(this.id)">
    <label class="custom-control-label" for="${'switch' + divId}"></label>
    </div>
    <h5 class="card-title">${name}</h5>
    <p class="card-text">${symbol}</p>
    <button class="btn btn-primary" type="button" data-toggle="collapse" onclick="setNewInfo('${id}' ,'${symbol}')"
    data-target=#${"collapse" + divId} aria-expanded="false" aria-controls=${"collapse" + divId}">
    More info
    </button>
    <div class="collapse" id=${"collapse" + divId}>
    <div class="card card-body" id="${symbol}">
    <p>loading..</p>
    <div class="spinner-grow text-primary" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    `;
    $(".row").append(card);
}

function addModal() {
    return `
    <div class="modal fade text-center" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div>
        <div class="row">
        <div class="modal-body">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    ` ;
}

function createCoins() {
    $(".pageContent").empty();
    getAjax("https://api.coingecko.com/api/v3/coins/list", success => {
        $(".pageContent").append(`
    <div class='row justify-content-center' style='padding:5px;'></div>`);
        $(".pageContent").append(`<div class="searchResult"></div>`);
        for (let i = 0; i < 500; i++) {
            createCoinCard(success[i].symbol, success[i].name, i, success[i].id);
        }
    });
}
//--- for chart when user click on chart page collect all selected coins . --- // 
function getAllCoins() {
    const checkedCoinsToChart = $("input:checked");
    let tmp = new Array();
    for (let i = 0; i < checkedCoinsToChart.length; i++) {
        tmp.push(checkedCoinsToChart[i].name.toUpperCase());
    }
    return localStorage.setItem("ajaxCoins", JSON.stringify(tmp));
}