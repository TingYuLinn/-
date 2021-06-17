let openData = '';
function getData(){
    let xhr = new XMLHttpRequest();
    xhr.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
    xhr.send();
    xhr.onload = function(){
        openData = JSON.parse(xhr.responseText).result.records;
        addOption();
        setListContent();
    }
}

function init(){
    getData();
    setListContent();
}
init();


let allDistrictOption = document.querySelector('.district-select');
let viewpointList = document.querySelector('.viewpointList');
let hotZone = document.querySelector('.popular-district');
let title = document.querySelector('.viewpoint h2');



allDistrictOption.addEventListener('change', function(e) {
    let select = e.target.value;
    title.innerHTML = select;
    setListContent(select);
  });
hotZone.addEventListener('click',function(e){
    console.log(e.target.value);
    if(e.target.nodeName !== 'INPUT'){return}
    let select = e.target.value;
    title.innerHTML = select;
    setListContent(select);
});



//撈Zone的資料放進select選項
function addOption() {
    let set = new Set();
    let result = openData.filter(item => !set.has(item.Zone) ? set.add(item.Zone) : false);
    let str = '';
    for (let i = 0; i < result.length; i++) {
        str += '<option value="' + result[i].Zone + '">' + result[i].Zone + '</option>';
    }
    // console.log(str);
    allDistrictOption.innerHTML = '<option value="請選擇行政區" selected disabled>--請選擇行政區--</option>' + str;
}
addOption();

//首頁全部景點
function setListContent(select) {
    let ary = openData;
    console.log(ary);
    let str = '';
    for (let i = 0; i < ary.length; i++) {
        if(select == ary[i].Zone){
            str +=
            '<li class="list-box">'+
                '<div class="list-img" style="background-image: url('+ary[i].Picture1+');">'+
                '<h3>'+ary[i].Name+'</h3>'+
                '<h4>'+ary[i].Zone+'</h4>'+
                '</div>'+
                '<ul class="list-detail">'+
                    '<li><i class="far fa-clock"></i>'+ary[i].Opentime+'</li>'+
                    '<li><i class="fas fa-map-marker-alt"></i>'+ary[i].Add+'</li>'+
                    '<li><i class="fas fa-mobile-alt"></i>'+ary[i].Tel+'</li>'+
                    '<span class="list-tag"><i class="fas fa-tag"></i>'+ary[i].Ticketinfo+'</span>'+
                '</ul>'+
            '</li>'
            viewpointList.innerHTML = str;
        }
    }
}

