// const api = 'https://hexschool.github.io/ajaxHomework/data.json'
// axios.get(api)
//   .then( (res)=> {
//     console.log(res.data)
//     console.log(res.status)
//     console.log(res.statusText)
//     console.log(res.headers)
//     console.log(res.config)
//   })
// //預設是不執行等到資料回傳的時候函式才執行
//current clock 
var currentTime
function updateCurrentTime(){
    currentTime = moment().format("LTS")
    $(".currenttime").html( currentTime )
}
setInterval(() => updateCurrentTime(), 1 * 1000)





const dataZone=document.querySelector('[data-zone]')
const dataSite=document.querySelector('[data-site]')
const apiUrl='https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=200&%24format=json'
let aqiData
let zone=[]
let site=[]


dataZone.addEventListener('change',function ChangeSite(e){
    getSite(e.target.value)
})

axios.get(apiUrl)
  .then((res)=>{
    aqiData = res.data
    getZone()
    getSite('新北市')
  })
  .catch((err)=>{
    console.log(err)
  })


//先取得API裡面的地方名稱
var getZone = () => { 
    let noneFilter = []
    aqiData.forEach(item => {
        noneFilter.push(item.County)
    });
    
    zone = noneFilter.filter(function(element, index, arr){
        return arr.indexOf(element) === index;
    });

    zone.forEach(item=>{
        let str=`<option value="${item}" >${item}</option>`
        dataZone.innerHTML+=str
    })
}


//取得該城市
var getSite = (County) => {
    let dataCountry = document.querySelector('[data-country]')
    let dataTime = document.querySelector('[data-time]')
    site = []
    dataSite.innerHTML = ''
    aqiData.forEach(item => {
        if(County == item.County){
            site.push(item)
        }else {
            return 
        }
    })
    dataCountry.textContent = County
    dataTime.textContent=`${site[0].PublishTime} Update`
    displaySite()
}

function displaySite(){
    site.forEach(item=>{
        let str=`
        <div class="col-6 mb-4">
            <div class="btn-group btn-block" role="group" aria-label="Basic example" data-btn>
                <button type="button" class="btn py-4  border mb-0" data-btn-site>${item.SiteName}</button>
                <button type="button" class="btn  btn-primary border mb-0" data-aqi>${item.AQI}</button>
            </div>
        </div>
        `
        dataSite.innerHTML += str
    })
    aqiColor()
    displayList(site[0].SiteName)
}

var aqiColor = () =>{
    const dataAqi = document.querySelectorAll('[data-aqi]')
    const btn = document.querySelectorAll('[data-btn-site]')
    for (let i = 0; i < dataAqi.length; i++) {
        switch (true){
            case dataAqi[i].textContent < 51:
                dataAqi[i].style.background = '#A95F084'
            break;
            case dataAqi[i].textContent > 50 && dataAqi[i].textContent<101:
                dataAqi[i].style.background = '#FFE695'
            break;
            case dataAqi[i].textContent > 100 && dataAqi[i].textContent<151:
                dataAqi[i].style.background = '#FAAF4A'
            break;
            case dataAqi[i].textContent > 150 && dataAqi[i].textContent<201:
                dataAqi[i].style.background = '#FC6174'
            break;
            case dataAqi[i].textContent > 200 && dataAqi[i].textContent<301:
                dataAqi[i].style.background = '#B272B6'
            break;
            case dataAqi[i].textContent > 300:
                dataAqi[i].style.background = '#935675'
            break;
            
        }
    }
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click',function changeList(e){
            displayList(e.target.textContent)
            console.log(e.target.textContent)
        })    
    }

}

var displayList = (e) => {
    const list = document.querySelector('[data-list]')
    list.innerHTML = ``
    site.forEach(item => {
        if(item.SiteName == e){
            let str = `
                <div class="btn-group btn-block rounded-0" role="group" aria-label="Basic example" data-btn>
                    <button type="button" class="btn py-4  border rounded-0 mb-0">${item.SiteName}</button>
                    <button type="button" class="btn  btn-primary border rounded-0 mb-0" data-aqi>${item.AQI}</button>
                </div>
                <ul class="p-4 px-3 mt-2 border aqi-list">
                    <li class="d-flex align-items-end  pb-4 mb-4">
                        <h5 class="mb-0 mr-2">臭氧</h5>
                        <span >O3 (ppb)</span>
                        <h5 class="ml-auto mb-0">${item.O3}</h5>
                    </li>
                    <li class="d-flex align-items-end  pb-4 mb-4">
                        <h5 class="mb-0 mr-2">懸浮微粒</h5>
                        <span >PM10 (μg/m³)</span>
                        <h5 class="ml-auto mb-0">${item.PM10}</h5>
                    </li>
                    <li class="d-flex align-items-end  pb-4 mb-4">
                        <h5 class="mb-0 mr-2">細懸浮微粒</h5>
                        <span >PM2.5 (μg/m³)</span>
                        <h5 class="ml-auto mb-0">${item['PM2.5']}</h5>
                    </li>
                    <li class="d-flex align-items-end  pb-4 mb-4">
                        <h5 class="mb-0 mr-2">一氧化碳  </h5>
                        <span >CO (ppm)</span>
                        <h5 class="ml-auto mb-0">${item.CO}</h5>
                    </li>
                    <li class="d-flex align-items-end  pb-4 mb-4">
                        <h5 class="mb-0 mr-2">二氧化硫</h5>
                        <span >SO2 (ppb)</span>
                        <h5 class="ml-auto mb-0">${item.SO2}</h5>
                    </li>
                    <li class="d-flex align-items-end">
                        <h5 class="mb-0 mr-2">二氧化氮</h5>
                        <span >NO2 (ppb)</span>
                        <h5 class="ml-auto mb-0">${item.NO2}</h5>
                    </li>
                </ul>
            `
            list.innerHTML+=str
        }else{
            return
        }
        aqiColor()
    })
}

