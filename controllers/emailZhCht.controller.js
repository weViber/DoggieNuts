const moment = require("moment");
const db = require("../models");
const nodemailer = require("nodemailer");
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD } = require("../common");

const { email: Email } = db;

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE, // 메일 보내는 곳
  port: 465,
  host: "smtp.naver.com",
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL_USER, // 보내는 메일의 주소
    pass: EMAIL_PASSWORD, // 보내는 메일의 비밀번호
  },
});
const customer = nodemailer.createTransport({
  service: EMAIL_SERVICE, // 메일 보내는 곳
  port: 465,
  host: "smtp.naver.com",
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL_USER, // 보내는 메일의 주소
    pass: EMAIL_PASSWORD, // 보내는 메일의 비밀번호
  },
});

const doggienutsEmail = "petsmealkorea@naver.com";

exports.postEmailZhCht = async (req, res) => {
  const {
    name,
    phone,
    email,
    company,
    selectItems,
    sample,
    country,
    products,
  } = req.body;
  const handleHtml = () => {
    if (email) {
      ("<p style='font-size : 18px; margin-bottom : 30px; color: #CACACA'>Email By <span style='font-weight : 600; margin-right: 10px;'>${ email }</span></p>");
    }
  };
  await transporter
    .sendMail({
      from: EMAIL_USER, // sender address
      to: doggienutsEmail, // list of receivers
      subject: "Doggienuts 문의내역", // Subject line
      html: `<div style='
                    width: 100%;
                    min-height: 1300px
                '>
                    <div style='
                            text-align: left;
                            width: 800px;
                            margin: 30px auto;
                            padding: 40px 80px;
                            border: 1px solid #EDEDED;
                            background: #FFF;
                            box-sizing: border-box;
                        '>
                        <h3 style='font-size : 26px; font-weight : 400; margin-bottom : 30px; text-align: center;'>Doggienuts 문의 내역</h3> 
                        <p style='font-size : 18px; margin-bottom : 30px; text-align: center;'>이메일 By <span style='font-weight : 600; margin-right: 10px; text-align: center;'>${email}</span></p>
                        <div style='width: 400px; margin: 0 auto;'>
                        <p style='font-size : 18px;'>이름 : <span style='font-weight : 600; margin-right: 10px;'>${name}</span></p>
                        <p style='font-size : 18px;'>핸드폰 : <span style='font-weight : 600; margin-right: 10px;'>${phone}</span></p>
                        <p style='font-size : 18px;'>회사 : <span style='font-weight : 600; margin-right: 10px;'>${company}</span></p> 
                        <p style='font-size : 18px;'>국가 : <span style='font-weight : 600; margin-right: 10px;'>${country}</span></p> 
                        <p style='font-size : 18px;'>선택 품목 : <span style='font-weight : 600; margin-right: 10px;'>${JSON.parse(
                          selectItems
                        )}</span></p>
                        <p style='font-size : 18px;'>샘플 품목 : <span style='font-weight : 600; margin-right: 10px;'>${JSON.parse(
                          sample
                        )}</span></p>
                        <p style='font-size : 18px; font-weight : 600; margin-right: 10px; color: gray'>| 甜甜圈 도넛 | 脆片 칩 | 燉菜 스튜 | 오메가 3 |</p>
                        </div>      
                        <p style='font-size : 18px; text-align: center'>문의내용</p>
                        <div style='font-size : 18px; font-weight : 600; margin-right: 10px; text-align: justify'>${products}</div>
                    </div>
                </div>`,
    })
    .then((response) => {
      console.log("Email sent: " + response.response);
      res.status(200).json({ message: "Success" });
    })
    .catch((error) => console.log(error))
    .then(
      await customer.sendMail({
        from: EMAIL_USER, // sender address
        to: email, // list of receivers
        subject: "Doggienuts 確認產品諮詢", // Subject line
        html: `<div style='
        width: 100%;
        min-height: 1300px
    '>
        <div style='
                text-align: left;
                width: 800px;
                margin: 30px auto;
                padding: 40px 80px;
                border: 1px solid #EDEDED;
                background: #FFF;
                box-sizing: border-box;
            '>
                        <h3 style='font-size : 26px; font-weight : 400; margin-bottom : 30px; text-align: center;'>Doggienuts 確認產品諮詢</h3> 
                        <p style='font-size : 18px; margin-bottom : 30px; text-align: center'>電子郵箱 : <span style='font-weight : 600; margin-right: 10px; text-align: center;'>${email}</span></p>      
                        <div style='width: 400px; margin: 0 auto;'>
                        <p style='font-size : 18px;'>姓名 : <span style='font-weight : 600; margin-right: 10px;'>${name}</span></p>
                        <p style='font-size : 18px;'>電話號碼 : <span style='font-weight : 600; margin-right: 10px;'>${phone}</span></p>
                        <p style='font-size : 18px;'>公司 : <span style='font-weight : 600; margin-right: 10px;'>${company}</span></p> 
                        <p style='font-size : 18px;'>國家 : <span style='font-weight : 600; margin-right: 10px;'>${country}</span></p> 
                        <p style='font-size : 18px;'>感興趣的產品 : <span style='font-weight : 600; margin-right: 10px;'>${JSON.parse(
                          selectItems
                        )}</span></p>
                        <p style='font-size : 18px;'>感興趣的樣品 : <span style='font-weight : 600; margin-right: 10px;'>${JSON.parse(
                          sample
                        )}</span></p>
                        </div>   
                        <p style='font-size : 18px; text-align: center'>咨詢內容</p>
                        <div style='font-size : 18px; font-weight : 600; margin-right: 10px; text-align: justify'>${products}</div>
                    </div>
                </div>`,
      })
    )
    .catch((error) => console.log(error));
};
