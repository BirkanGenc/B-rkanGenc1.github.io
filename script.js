//Gerekli olan tüm ögeler seçilir.
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Sınava başla butonuna tıklandığında
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //sınav hakkındakı bılgılerı gösterir.
}

// geri gel butonuna tıklandığında
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //bilgi kutusunu gizler
}

// devam et butonuna tıklandığında
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //bilgi kutusunu gizler
    quiz_box.classList.add("activeQuiz"); //sınav kutusunu gösterir
    showQuetions(0); //soruları göster fonksıyonu cagrılır. indeksi sıfır olan soru cagrılır.
    queCounter(1); 
    startTimer(10); //süre sayıcı cagrılır. gerisayaım yapılır
}

let timeValue =  10;
let que_count = 0; // her soru gectıgınde artar.
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// sınava tekrar basla butonuna tıkladıgında
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //sınav jutusunu gösterir.
    result_box.classList.remove("activeResult"); //sonuç kutusunu kapatır.
    timeValue = 10; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //showQuestions cagrılır. soru sayısı
    queCounter(que_numb); //soru sayısını  queCountera akratılır.
    clearInterval(counter); //sayac temizlenir.soru sayısı sıfırlanır.
    clearInterval(counterLine); //counterLine temizlenir
    startTimer(timeValue); //surebaslatma fonsıyonu cagrılır.
    timeText.textContent = "Kalan Süre"; //kalan sure yazısı yazılır.
    next_btn.classList.remove("show"); 
}

// Sınavdan cık butonuna tıkladıgında
quit_quiz.onclick = ()=>{
    window.location.reload(); //sınava basla ekranı tekrar yüklenir
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn_bb = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); //showQuestions fonksiyonu cagrılır.
        queCounter(que_numb); //quenumb degeri queCountera aktarılır
        clearInterval(counter); //sayac temizlenir
        clearInterval(counterLine); //counterLine temizlenir
        startTimer(timeValue); //starttimer fonksıyonu cagrılır.
        timeText.textContent = "Kalan Süre"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); //showresult fonk cagrılır.
    }
}

// soruları ve seceneklerı alma
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //sorulara vıdeoo ve resim ekleme ksımları
    let imagerings = "";
    let videorings="";
    let que_tag;
    if (questions[index].numb === 2) {
        imagerings = `
        <img class='answer-image' src='Glamdring1.png'>` 
        que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'<br>'+ imagerings +'</span>';
    }else if(questions[index].numb === 4) {
        videorings = `  
        <video width="320" height="240" controls autoplay> 
<source src="video1.mp4" type="video/mp4"'>                
</video>`
// vıdeonun oldugu kaynaga gıder
        que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'<br>'+ videorings +'</span>';
   
    } else {
        que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    }

    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>';
    
        for(let i=1;i<=7;i++) {
            if(questions[index].options[i] != undefined) {
                option_tag+='<div class="option"><span>'+ questions[index].options[i] +'</span></div>'
            }
        };
    
        
    que_text.innerHTML = que_tag; //quetag  quetextin  üstüne yazılır.
    option_list.innerHTML = option_tag; //optıon_tag ı seceneklerın ıcıne aktarıyoruz.
    
    const option = option_list.querySelectorAll(".option"); //query selectorAll ile butun optionlar secılır.

    // s
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");//optiona özellık eklıyoruz
    }
}

// simgeler için yeni div oluşturma
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//hrhangi bir şık secılırse
function optionSelected(answer){
    clearInterval(counter); //counter temizlenir.
    clearInterval(counterLine); 
    let userAns = answer.textContent; // kulanıcının cevabı alınır
    let correcAns = questions[que_count].answer; //diziden doğru cevabı alır.
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ //cevaplar aynı ise
        userScore += 1; //userscore artar
        answer.classList.add("correct"); //dogru ise yesil renk olur
        answer.insertAdjacentHTML("beforeend", tickIconTag); //onay simgesi eklenir
        
    }else{
        answer.classList.add("incorrect"); //yanlis ise kırmızı renk olur
        answer.insertAdjacentHTML("beforeend", crossIconTag); //carpı isareti eklenır.
       

        for(i=0; i < allOptions; i++){ // eger kullanıcı sure bitene kadar cevap vermesse otomatik dogru cevap yanar. 
            if(option_list.children[i].textContent == correcAns){ //eger yanıt eslesıyor ıse
                option_list.children[i].setAttribute("class", "option correct"); //özellik ekleyıp correct klasına gider.
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // onay tiki yazılır
               
            }
        }
    }
    for(i=0; i < allOptions; i++){ // soruda bır secenek secıldıkten sonra baska secenek secılmemesı ıcın.
        option_list.children[i].classList.add("disabled"); //bir secenek secıldıkten sonra dıger secenekler devre dısı bırakıır.
    }
    next_btn.classList.add("hide"); 
    window.setTimeout(next_btn_bb, 1000) // dogru şık belirli olduktan sonra dıger soruya gecilir.
}

function showResult(){
    info_box.classList.remove("activeInfo"); //infobox ın classından aktifliği remove eder.
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); //resultbox ın clasına activersultu eklıyoruz. sonucu gösterir.
    const scoreText = result_box.querySelector(".score_text"); //queryselector ile  scoretexti secıyoruz.
    let scoreTag = '<span> Sınav Sonucunuz:<p>'+ userScore +'</p>/<p>'+ questions.length +'</p></span>'; // toplam sonucu yazar.
        scoreText.innerHTML = scoreTag;  
    }
   
function startTimer(time){ // sayac olusturulur.
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //timeCount değerini zaman değeriyle değiştirilir.
        time--; // zaman degerını azaltıyoruz.
        if(time < 9){ //9 dan kucukse
            let addZero = timeCount.textContent;  // timecount textcontent kısmına eklenır
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ // zamanlayıcı sıfrdan kucukse
            clearInterval(counter); //zamanlayıcıyı temizle
            timeText.textContent = "Süre Bitti"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; //dogru cevapları alma
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //yanıtlar dogru cevap ile eslesirse
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); // bır şık secıldıkten sonra diger şıklar devre dısı olur.
            }
            next_btn.classList.add("hide"); 
            window.setTimeout(next_btn_bb, 3000)
        }
    }
}

function queCounter(index){
    // sınav sonucunda toplam skoru ekrana yazar.
    let totalQueCounTag = '<span><p>'+ userScore +'</p>/<p>'+ index +'</p></span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}

