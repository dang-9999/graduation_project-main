import React from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { useEffect } from "react";
import { useState } from "react";
import instance from "../Request";
import qs from "qs";



export default function Search(){
    
  const [protein, setProtein] = useState(""); //입력 값 변수 [입력값, 입력값 변경]
  const [proteinName, setProteinName] = useState(""); // 저장 후 변수

  const [button, setButton] = useState(true);

  function changeButton(){
    const UpperProtein = protein.toUpperCase();
   
   
    (UpperProtein.includes("B") || UpperProtein.includes("J") || UpperProtein.includes("O") || UpperProtein.includes("X") || UpperProtein.includes("Z") || UpperProtein.includes(" ")) ? setButton(true) : setButton(false)

   }


  const handleInput = (event) => {
    event.preventDefault();
    setProtein(event.target.value); //변수 저장 완료
   
  };
  
  
   const confirm = async (event) => {
    // 확인 후 다음 페이지
    event.preventDefault();
    setProteinName(protein);
    

    //window.location.href = "/proteinInput";

    // const result = await axios.get('http://127.0.0.1:5000/api/Input');
    // this.recordCount = result.headers["x-totalrecordcount"];

    axios.get('http://127.0.0.1:5000/api/Input',
      {params: { "proteinName" : protein }
    }).then(function (response) {
      console.log(protein);
     }).catch(function (error){
      console.log(error);
     })


     axios.post('http://127.0.0.1:5000/api/Input',{
      proteinName: protein
     }).then(function(response){
      console.log("포스트 완료");
     }).catch(function (error){
      console.log(error);
     })

     
     
    
    //console.log(protein);

    
    //api post
      
    localStorage.setItem("proteinName", protein);
    //localstorage 업로드
  };

  return (
    <div className="page">
      <div className="titleprotein">단백질 시퀀스를 입력해 주세요</div>

      <div className="contentWrap">
        <div className="inputTitle">단백질 시퀀스</div>
        <div className="inputWrap">
          <input
            className="input"
            value={protein} //input으로 받은 프로틴 시퀀스
            onChange={handleInput}
            onKeyUp={changeButton}
            
          />

          {/* place holder 넣어 보기 */}
        </div>

        <div className="errorMessageWrap">올바른 시퀀스를 입력해 주세요</div>
      </div>
      <div>
        <button 
        disabled={button} 
        onClick={confirm} 
        className="bottomButton">
          확인
        </button>
      </div>
    </div>
  );
}
