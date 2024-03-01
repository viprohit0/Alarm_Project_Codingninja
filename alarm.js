(function(){
    let alarmsArr=[];
    var a=document.getElementById("real-time");
    var alarmList= document.getElementById("alarm-list");
    var selectOptions= document.querySelectorAll("select");
    var myRingtone = new Audio("ve_haaniyaan.mp3");   //creating Audio object For Ringtone 
    var imgg= document.getElementById("logo");

    setInterval(()=>{      //Creating digital watch 
        var today = new Date();
        var t=today.toLocaleTimeString();
        //console.log(today.toLocaleTimeString());
        if((today.getHours()<10)){
            t="0"+today.toLocaleTimeString(); 
            a.innerHTML=t;  
        }else if(12<today.getHours()&&today.getHours()<22){
            t="0"+today.toLocaleTimeString(); 
            a.innerHTML=t;  
        }else{
            t=today.toLocaleTimeString(); 
            a.innerHTML=t;
        }
    
        if(alarmsArr.length>0){    //checking and ringing 
            for (var i of alarmsArr){
                if((i.tym==t)&& (i.done==false)){
                    // console.log(i.tym);
                    i.done=true;
                    myRingtone.play();
                    myRingtone.loop= true;  //play ringtone in loop till the stop button triggered
                    imgg.classList.add("animate__tada");        //Animation for logo while ringing 
                    imgg.classList.add("animate__infinite");
                }

            }
        }

    });

    for( let i=12;i>=1;i--){
        if(i<10){
            i="0"+i;
        }
        var options=`<option value="${i}">${i}</option>`;
        selectOptions[0].firstElementChild.insertAdjacentHTML("afterend",options)
    }
    for( let i=59;i>=0;i--){
        if(i<10){
            i="0"+i;
        }
        var options=`<option value="${i}">${i}</option>`;
        selectOptions[1].firstElementChild.insertAdjacentHTML("afterend",options)
    }
    for( let i=59;i>=0;i--){
        if(i<10){
            i="0"+i;
        }
        var options=`<option value="${i}">${i}</option>`;
        selectOptions[2].firstElementChild.insertAdjacentHTML("afterend",options)
    }
    function addDomElement(alarm){ //Adding List content 
        const li = document.createElement('li');

            li.innerHTML=`${alarm.tym}
                        <button class="delete" id="${alarm.id}">Delete </button>`
            alarmList.append(li);
    }

    function setDeleteStop(e){ //Creating Alarm object 

        if(e.target.id=='setButton'){ 
            if(!isNaN(selectOptions[0].value)&& !isNaN(selectOptions[1].value) && !isNaN(selectOptions[2].value)){
                let setTime=(selectOptions[0].value+":"+selectOptions[1].value+":"+selectOptions[2].value+" "+selectOptions[3].value).toString();
                const alarm={
                    tym:setTime,
                    id:Date.now().toString(),
                    done:false
                }; 
                alarmsArr.push(alarm);
                renderList();

            } else {
                alert("Please Enter A Valid Time");
            }
        } else if(e.target.className=='delete') { //deleating alarm object from array 
            const aid= e.target.id;
            // console.log(aid);
            deleteAlarm(aid);


        }else if (e.target.id=="stopButton"){ //To stop alarm
            myRingtone.pause();
            myRingtone.currentTime = 0;
            imgg.classList.remove('animate__tada','animate__infinite');

        }

    }
    function deleteAlarm(aid){
        let newAlarms=alarmsArr.filter(function(alarm){
            return alarm.id!==aid;
        })
        alarmsArr=newAlarms;
        renderList();
        alert("Alarm Deletion Successfull")
    }
    function renderList () { //To refresh Alarm list on every addition and deletion 
        alarmList.innerHTML='';
        for (var i=0 ;i<alarmsArr.length;i++){
            addDomElement(alarmsArr[i]);
        }
    }
    document.addEventListener('click',setDeleteStop);
})();
