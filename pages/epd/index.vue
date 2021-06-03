<template>
  <div class="iSite epd active" id="site_right" attr-site="epd" >
    <div class="head" style="background-image: url('/pages/epd/head.png')">
      <div class="iSite_content">
        <div class="text">
          <p class="big">Единый платежный документ<br>
            для оплаты коммунтальных услуг</p>

        </div>
        <AppAuthForm />
      </div>
    </div>
    <div class="wrap_site_content">
      <div class="advantages padding_content">
        <h3 class="title">Наши преимущества</h3>
        <div class="advantages_content ">
          <div class="item">
            <div class="icon">
              <img src="@/libs/img/passage-of-time.svg" alt="">
            </div>
            <div class="text">
              <h5>Экономия премени</h5>
              <p>Все платяжи в едином<br>документе</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <img src="@/libs/img/passage-of-time.svg" alt="">
            </div>
            <div class="text">
              <h5>Прозрачная система</h5>
              <p>Все начисоения и статистика<br>в  личном кабинете</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <img src="@/libs/img/passage-of-time.svg" alt="">
            </div>
            <div class="text">
              <h5>Принцип одного окна</h5>
              <p>Все данные соберем за вас из<br>разных источников</p>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <img src="@/libs/img/passage-of-time.svg" alt="">
            </div>
            <div class="text">
              <h5>Экономия денег</h5>
              <p>Заказывая у нас место вы<br>экономите деньги</p>
            </div>
          </div>
        </div>
      </div>
      <div class="callback_section">
        <div class="padding_content">
          <div class="callback_section_content">
            <div class="image">
              <img src="@/libs/img/girl1.png" alt="">
            </div>
            <div class="text">
              <h4>Оставь заявка прямо сейчас</h4>
              <p>Наш менеджер свяжется  с вами в ближайшее время<br>обсудить условия договр</p>
              <AppCallBack />
            </div>
          </div>
        </div>
      </div>
      <div class="news_home">
        <div class="news_home_content padding_content">
          <h3 class="title">Новости компании</h3>
          <div class="news_home_iblocks">
            <div class="item">
              <div class="date"><span>02.12.2019</span></div>
              <h4>Сервис обьединеные платежи заработал</h4>
              <a href="">Подробнее</a>
            </div>
            <div class="item">
              <div class="date"><span>02.12.2019</span></div>
              <h4>Сервис обьединеные платежи заработал</h4>
              <a href="">Подробнее</a>
            </div>
            <div class="item">
              <div class="date"><span>02.12.2019</span></div>
              <h4>Сервис обьединеные платежи заработал</h4>
              <a href="">Подробнее</a>
            </div>
            <div class="item">
              <div class="date"><span>02.12.2019</span></div>
              <h4>Сервис обьединеные платежи заработал</h4>
              <a href="">Подробнее</a>
            </div>

          </div>
        </div>
      </div>
      <div class="questions padding_content">
        <div class="questions_content">
          <h3 class="title">Вопросы и ответы</h3>
          <div class="questions_iblock">
            <div class="top_scroll_bar">
              <div class="top_iblock">
                <div class="item ib-1 active" @click="progressBarClick(2, 1, $event)">
                  <p>О сервисе</p>
                </div>
                <div class="item ib-2" @click="progressBarClick(21, 2, $event)">
                  <p>Партнерам</p>
                </div>
                <div class="item ib-3" @click="progressBarClick(39, 3,  $event)">
                  <p>Интерфейс</p>
                </div>
                <div class="item ib-4" @click="progressBarClick(57, 4, $event)">
                  <p>Выгрузка</p>
                </div>
                <div class="item ib-5" @click="progressBarClick(75, 5, $event)">
                  <p>Квитанции</p>
                </div>
                <div class="item ib-6" @click="progressBarClick(95, 6, $event)">
                  <p>Общие вопросы</p>
                </div>
              </div>
              <div class="bar">
                <div class="line_bar" :style="{width: progressBar + '%' }"></div>
              </div>
            </div>

            <div class="questions_tabs_section">
              <div class="tab tab1 active">
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?1</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?1</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
              </div>
              <div class="tab tab2">
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
              </div>
              <div class="tab tab3">
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
              </div>
              <div class="tab tab4">
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
              </div>
              <div class="tab tab5">
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
              </div>
              <div class="tab tab6">
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
                <div class="tab_item">
                  <h4>Как стать вашим партнером ?2</h4>
                  <p>Очень лекго чувак) Короче братан видишь там с вверху форма и есть кнопщенция. На ней еще такая надпись “Стать партнером”. Увидел ? Красава. И так поехали дальше.
                    <br><br>
                    Берешь нажимаешь на копку появляется кнопка и там появляется форма. Вот это даааа такой эффект  я аж кончил. И так братишка заполни ее и все считай мы партнеры</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div class="document padding_content" >
        <h3 class="title">Шаблоны документов</h3>
        <div class="document_content">
          <a href="" class="item">
            <img src="@/libs/img/documentFile.svg" alt="">
            <span>Описание шаблона</span>
          </a>
          <a href="" class="item">
            <img src="@/libs/img/documentFile.svg" alt="">
            <span>Шаблон ЕПД</span>
          </a>
          <a href="" class="item">
            <img src="@/libs/img/documentFile.svg" alt="">
            <span>Платежи</span>
          </a>
        </div>
      </div>
      <div class="contacts_section padding_content" id="contacts_section">
        <div class="contacts_section_content">
          <div class="left info">
            <h3 class="title">Как связаться с нами</h3>
            <div class="contacts_info">
              <a href="">Телефон: <b>+7 999 256 14 22</b></a>
              <a href="">Электроная почта: <b>info@epd.ru</b></a>
              <a>Адрес:<br><b>Московский просп., 19, корп. 11</b></a>
            </div>
            <h5>Социальные сети: </h5>
            <div class="social">
              <a href=""><img src="@/libs/img/telegram.svg" alt=""></a>
              <a href=""><img src="@/libs/img/viber.svg" alt=""></a>
              <a href=""><img src="@/libs/img/whatsapp.svg" alt=""></a>
            </div>
          </div>
          <div class="right">
            <h5>Оставьте заявку прямо сейчас</h5>
            <p>Наш менеджер свяжется  с вами в ближайшее время<br>обсудить условия договр</p>
            <AppCallFooter />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppAuthForm from '/components/Epd/Home/HomeAuthForm'
  import AppCallBack from '/components/Epd/Home/HomeCallbackForm'
  import AppCallFooter from '/components/Epd/Home/HomeCallFooter'
  export default {
    layout: 'landing',
    head() {
      return {
        title: 'Личный кабинет постащика услуг и коммунальных ресурсов',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Добавление и изменение информации об организации. Загрузка данных для формирования электронных квитанций ЖКХ. Формирование объединенного платежного документа. Выгрузка реестра показаний счетчиков.'
          },
          {
            name: 'keywords',
            content: 'электронная квитанця, реестр показаний счетчиков, информация об организации'
          }
        ],
      }
    },
    data(){
      return{
        progressBar: 2,
      }
    },
    components:{
      AppAuthForm,
      AppCallBack,
      AppCallFooter
    },
    methods:{
      progressBarClick: function (numBar, tabItem, event) {
        this.progressBar = numBar;
        for (var item of document.querySelectorAll('.questions_content .item')) {
          item.classList.remove('active');
        }
        for (var item of document.querySelectorAll('.questions_tabs_section .tab')) {
          item.classList.remove('active');
        }
        for( var i=1; i <= tabItem ; i++){
          document.querySelector('.questions_content .ib-' + i).classList.add("active");
        }
        document.querySelector('.tab.tab' + tabItem).classList.add("active");
      },
    }
  }
</script>
<style lang="scss" scoped>

  $black:#333333;
  $blue: #0079FE;
  @keyframes showForm {
    0%{
      display: block;
      opacity: 0;
    }
    30%{
      right: -100%;
    }
    60%{
      right: 0;
      opacity: 1;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes blackSite {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  .iSite{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: 1s all;
    background-attachment: fixed;
    &.epd{
      .logo{
        position: absolute;
        top: 10px;
        right: 10px;
        a{
          color: #fff;
          font-weight: 100;
          display: flex;
          align-items: center;
          img{
            margin-right: 10px;
            height: 30px;
          }
        }
      }
      .iSite_content{
        position: relative;
        display: flex;
        .big{
          transition: .4s all;
          position: relative;
        }
        p{
          font-weight: 100;
          font-size: 36px;
          line-height: 130.6%;
          color: #FFFFFF;
        }
      }
      .head{
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-attachment: fixed;
        height: 100vh;
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 125px;
        box-sizing: border-box;
        form{
          display: none;
          background: #FFFFFF;
          border-radius: 5px;
          width: 400px;
          padding: 35px;
          box-sizing: border-box;
          h4{
            font-style: normal;
            font-weight: 300;
            font-size: 20px;
            line-height: 130.6%;
          }
          p{
            font-weight: 300;
            font-size: 16px;
            line-height: 130.6%;
            color: #333333;
            opacity: 0.5;
            margin-bottom: 20px;
          }
          .field{
            position: relative;
            margin-bottom: 15px;
            label{
              font-weight: 300;
              font-size: 21px;
              line-height: 130.6%;
              color: #C0C0C0;
              position: absolute;
              top: 8px;
              left: 22px;
              transition: .4s all;
              &.active{
                font-size:12px;
                top:7px;
              }
            }
            input{
              border: none;
              border: 1px solid #B7B7B7;
              box-sizing: border-box;
              border-radius: 5px;
              width: 100%;
              box-sizing: border-box;
              padding: 14px 22px;
              transition: .4s all;
              height: 46px;
              &.active{
                padding-top: 18px;
                padding-bottom: 10px;
              }
              &.error{
                border:1px solid red;
              }
            }
            .more{
              position: absolute;
              display: flex;
              right: 0;
              top: 14px;
              a{
                color: #0079FE;
                font-weight: 300;
                font-size: 14px;
              }
            }
          }
          .button{
            display: flex;
            justify-content: space-between;
            .btn{
              display: flex;
              align-items: center;
              justify-content: center;
              width: 160px;
              height: 50px;
            }
          }
        }
      }
      &.active{
        .head{
          .iSite_content{
            .big{
              transition: .4s all;
              position: relative;
              left: -50%;
            }
          }
          form{
            display: block;
            animation: showForm  2s ease-in-out;
          }
        }
      }
    }
    &.notActive{
      width: 7%;
    }
    &.active{
      width: 100%;
      //min-width: 90% !important;
      transition: 1s all;
    }
  }
  .bottom_select{
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-left: -100px;
    &.hideNone{
      display: none;
    }
    p{
      color: #fff;font-weight: bold;
      font-size: 16px;
      line-height: 130.6%;
      color: #FFFFFF;
    }
  }
  .title{
    font-weight: 100;
    font-size: 1.7em !important;
    line-height: 36px;
    color: $black;
    margin-bottom: 50px;
  }
  .padding_content{
    padding: 50px 20px;
    box-sizing: border-box;
    width: 1400px;
    margin-right: auto;
    margin-left: auto;
  }
  .advantages{
    .advantages_content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        .icon{
          background-color: #fff;
          width: 82px;
          height: 82px;
          max-width: 82px;
          max-height: 82px;
          border-radius: 50%;
          background: #EBEBEB;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: 100%;
          margin-right: 20px;
          text-align: center;
          img{
            width: 40px;
            height: auto;
          }
        }
        .text{
          h5{
            font-weight: normal;
            font-size: 18px;
            line-height: 21px;
            margin-bottom: 5px;
          }
          p{
            font-style: normal;
            font-weight: 100;
            font-size: 14px;
            line-height: 17px;
          }
        }
      }
    }
  }
  .callback_section{
    margin-top: 20px;
    background: linear-gradient(270deg, #EBEBEB 0%, rgba(235, 235, 235, 0) 98.57%);
    border-radius: 5px;
    .callback_section_content{
      padding: 62px 93px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      height: 280px;
      .image{
        position: absolute;
        bottom: -52px;
        left: 15%;
        img{
          height: 400px;
        }
      }
      .text{
        h4{
          font-style: normal;
          font-weight: 100;
          font-size: 29px;
          line-height: 35px;
          margin-bottom: 15px;
        }
        p{
          font-weight: 100;
          font-size: 18px;
          line-height: 140.9%;
          color: #333333;
          opacity: 0.8;
        }
        form{
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          width: 590px;
          justify-content: space-between;
          .field{
            width: 48%;
            margin-right: 2%;
            label{
              font-size: 16px;
              top: 15px;
              transition:.4s all;
              &.active{
                font-size:12px;
                top:7px;
              }
            }
            input{
              font-size: 16px;
              transition:.4s all;
              &.active{
                padding-top: 18px;
                padding-bottom: 10px;
              }
              &.error{
                border:1px solid red;
              }
            }
          }
          .button{
            width: 100%;
            margin-top: 10px;
            .btn{
              font-weight: normal;
              width: 180px;
            }
          }
        }
      }
    }
  }
  .news_home{
    background-color: #FAFCFF;
    .news_home_iblocks{
      display: flex;
      .item{
        width: 25%;
        padding-right: 10px;
        box-sizing: border-box;
        .date{
          margin-bottom: 8px;
          span{
            font-size: 14px;
            line-height: 17px;
            color: #B7B7B7;
          }
        }
        h4{
          font-weight: 300;
          font-size: 18px;
          line-height: 132.9%;
          height: 90px;
          margin-bottom: 20px;
        }
        a{
          color: $blue;
          font-weight: normal;
          font-size: 16px;
          line-height: 132.9%;
        }
      }
    }
  }
  .questions{
    .questions_content{
      .bar{
        background: #EBEBEB;
        border-radius: 40px;
        height: 9px;
        width: 100%;
        position: relative;
        .line_bar{
          background-color: $blue;
          height: 9px;
          border-radius: 40px;
          position: absolute;
          top: 0;
          left: 0;
          transition: .4s all;
        }
      }
      .top_iblock{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        p{
          font-weight: 300;
          font-size: 16px;
          line-height: 19px;
          color: #B7B7B7;
          transition: .4s all;
        }
        .item{
          position: relative;
          cursor: pointer;
          &:before{
            content: '';
            width: 14px;
            height: 14px;
            background: #EBEBEB;
            bottom: -26px;
            left: 50%;
            margin-left: -14px;
            position: absolute;
            border-radius: 50%;
            z-index: 2;
            transition: .4s all;
          }
          &:hover{
            p{
              color: $blue;
            }
          }
          &.active{
            p{
              color: $blue;
            }
            &:before{
              background-color: $blue;
            }

          }
        }
      }
    }
    .questions_tabs_section{
      .tab{
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        flex-wrap: wrap;
        display: none;
        &.active{
          display: flex;
        }
        .tab_item{
          width: 45%;
          h4{
            font-style: normal;
            font-weight: 100;
            font-size: 24px;
            line-height: 29px;
            color: #000000;
            margin-bottom: 20px;
          }
          p{
            font-weight: 300;
            font-size: 16px;
            line-height: 138.6%;
          }
        }
      }
    }
  }
  .document{
    h3{
      text-align: center;
    }
    .document_content{
      display: flex;
      justify-content: space-between;
      .item{
        display: block;
        width: 250px;
        outline: transparent;
        color: #333;
        text-align: center;
        span{
          margin-top: 15px;
          display: block;
          font-weight: 100;
          font-size: 18px;
          line-height: 21px;
        }
      }
    }
  }
  .contacts_section{
    .contacts_section_content{
      display: flex;
      .info{
        margin-right: 25%;
        background-color: transparent !important;
        a{
          display: block;
          outline: transparent;
          color: $black;
          font-weight: 100;
          font-size: 18px;
          line-height: 21px;
          margin-bottom: 17px;
          b{
            font-weight: normal;
          }
        }
        h5{
          font-weight: 100;
          font-size: 24px;
          line-height: 29px;
          color: $black;
          margin-top: 35px;
          margin-bottom: 20px;
        }
        .social{
          display: flex;
          a{
            margin-right: 20px;
            img{
              height: 25px;
            }
            &:last-child{
              margin-right: 0;
            }
          }
        }
      }
      .right{
        h5{
          font-style: normal;
          font-weight: 100;
          font-size: 29px;
          line-height: 35px;
          margin-bottom: 10px;
        }
        p{
          font-weight: 100;
          font-size: 18px;
          line-height: 140.9%;
          color: #333333;
          opacity: 0.8;
        }
        form{
          margin-top: 20px;
          width: 500px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .field{
            label{
              font-size: 16px;
              top: 14px;
              transition: .4s all;
              &.active{
                font-size:12px;
                top:7px;
              }
            }
            input{
              transition: .4s all;
              &.active{
                padding-top: 18px;
                padding-bottom: 10px;
              }
              &.error{
                border:1px solid red;
              }
            }
            textarea{
              width: 100%;
              max-width: 100%;
              height: 150px;
              max-height: 150px;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1500px){
    .padding_content{
      width: auto;
    }
    .wrapper .iSite.epd.active .head .iSite_content .big{
      left: -15%;
    }
    .callback_section .callback_section_content .image{
      left: 10%;
    }
  }
  @media screen and(max-width: 1400px){
    .iSite.epd{
      &.active{
        .head{
          .iSite_content{
            .big{
              left: 0;
            }
          }
        }
      }
      .head{
        padding: 0 20px;
        .text{
        }
      }
      .iSite_content{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .big{
          left: 0;
        }
      }
    }
    .advantages{
      .advantages_content{
        .item{
          width: auto;
          .icon{
            width: 70px;
            max-width: 70px;
            height: 70px;
            max-height: 70px;
            margin-right: 10px;
          }
        }
      }
    }
    .callback_section .callback_section_content .image{
      left: 0%;
    }
  }
  @media screen and (max-width: 1300px){
    .wrapper .iSite.epd .iSite_content p{
      font-size: 30px;
    }
  }
  @media screen and (max-width: 1200px){
    .wrapper{
      .iSite{
        &.jkh{
          &.notActive{
            .site_black{
              .site_black_info{
                h2{
                  font-size: 20px;
                  line-height: 100%;
                }
                p{
                  font-size: 14px;
                  line-height: 1;
                }
              }
            }
          }
        }
        &.epd{
          .head{
            padding-left: 80px;
          }
        }
      }
      .bottom_select{
        margin-left: -73px;
        p{
          font-size: 13px;
        }
        img{
          width: 150px;
        }
        .cursor{
          width: 30px;
        }
      }
    }
    .advantages{
      .advantages_content{
        .item{
          .text{
            h5{
              font-size: 16px;
            }
            p{
              font-size: 12px;
            }
          }
        }
      }
    }
    .callback_section .callback_section_content .text form{
      width: 400px;
    }
    .contacts_section{
      .contacts_section_content{
        justify-content: space-between;
        .info{
          margin-right: 0;
        }
      }
    }
  }
  @media screen and (max-width: 1024px){
    .advantages{
      .advantages_content{
        flex-wrap: wrap;
        .item{
          width: 50%;
          margin-bottom: 25px;
          justify-content: flex-start;
        }
      }
    }
    .callback_section .callback_section_content .image img{
      height: 365px;
    }
  }
  @media screen and (max-width: 996px){
    .iSite.epd .iSite_content p{
      font-size: 27px;
    }
    .wrapper{
      flex-wrap: wrap;
      .iSite{
        width: 100%;
        height: 50%;
        &.notActive{
          width: 100%;
          height: 7%;
        }
        &.active{
          width: 100%;
          height: 93%;
        }
        &.epd{
          .head{
            padding-left: 0;
          }
          &.active{
            .head{
              .iSite_content{
                .big{
                  left: 0;
                  font-size: 24px;
                  margin-right: 20px;
                }
              }
            }
          }
        }
        &.jkh{
          &.notActive{
            overflow: hidden;
            .site_black {
              max-width: 100%;
              max-height: 7%;
              z-index: 5;
              .site_black_info{
                transform: rotate(0deg);
              }
            }
          }
        }
      }
      .bottom_select{
        transform: rotate(-90deg);
        margin-top: -40px;
        .cursor{
          transform: rotate(90deg);
          position: relative;
          right: 13px;
        }
      }
    }
    .callback_section{
      padding-bottom: 0 !important;
      .callback_section_content{
        flex-wrap: wrap;
        height:auto;
        padding-bottom: 0;
        padding-top: 0;
        justify-content: center;
        .image{
          position: relative;
          left: 0;
          bottom: -5px;
          order: 1;
        }
        .text{
          form{
            width: 600px;
          }
        }
      }
    }
    .document{
      .document_content{
        flex-wrap: wrap;
        justify-content: flex-start;
        .item{
          width: 33%;
          margin-bottom: 30px;
        }
      }
    }
    .contacts_section{
      .contacts_section_content{
        flex-wrap: wrap;
        .info{
          margin-bottom: 20px;
        }
      }
    }
  }
  @media screen and(max-width: 768px){
    .iSite.epd{
      .iSite_content{
        flex-wrap: wrap;
        justify-content: center;
        .text{
          width: 100%;
          margin-bottom: 25px;
          text-align: center;
        }
      }
    }
    .wrapper{
      .iSite{
        &.epd{
          &.active{
            .head{
              .iSite_content{
                text-align: center;
                .text{
                  width: 100%;
                  margin-bottom: 25px;
                }
                .big{
                  font-size: 30px;
                  text-align: center;
                }
              }
              form{
                margin-left: auto;
                margin-right: auto;
              }
            }
          }
          .iSite_content{
            padding: 0 20px;
            box-sizing: border-box;
            flex-wrap: wrap;
          }
        }
      }
    }
    .news_home{
      .news_home_iblocks{
        flex-wrap: wrap;
        .item{
          width: 45%;
          margin-bottom: 20px;
        }
      }
    }
    .questions{
      .questions_tabs_section{
        .tab{
          flex-wrap: wrap;
          .tab_item{
            width: 100%;
            margin-bottom: 30px;
          }
        }
      }
    }
  }
  @media screen and(max-width: 650px){
    .iSite.epd{
      .iSite_content p{
        font-size: 23px;
      }
      .head{
        padding: 0 15px;
        form{
          width: 100%;
          padding: 20px;
        }
      }
    }
    .wrapper{
      .iSite{
        &.jkh{
          .iSite_content{
            h2{
              font-size: 24px;
            }
            p{
              font-size: 16px;
            }
          }
        }
        &.epd{
          .logo{
            a{
              font-size: 12px;
              img{
                height: 25px;
                margin-right: 5px;
              }
            }
          }
          .iSite_content{
            p{
              font-size: 16px;
            }
          }
          .head{
            form{
              width: 300px;
              padding: 20px;
              h4{
                font-size: 16px;
              }
              p{
                font-size: 12px;
              }
              .field{
                label{
                  font-size: 16px;
                  top: 13px;
                }
              }
              .button{
                .btn{
                  width: 125px;
                  font-size: 12px;
                  height: 40px;
                }
              }
            }
          }
          &.active{
            .head{
              .iSite_content{
                .big{
                  font-size: 20px;
                }
              }
            }
          }
        }
      }
      .bottom_select{
        margin-left: -70px;
        p{
          font-size: 10px;
        }
        img{
          width: 150px;
        }
        .cursor{
          width: 25px;
        }
      }
    }
    .title{
      font-weight: 100;
      font-size: 22px;
      line-height: 26px;
      margin-bottom: 25px;
    }
    .padding_content{
      padding: 30px 15px;
    }
    .advantages{
      .advantages_content{
        .item{
          width: 100%;
          .icon{
            width: 60px;
            height: 60px;
            max-height: 60px;
            max-width: 60px;
            img{
              width: 34px;
            }
          }
          .text{
            h5{
              font-weight: normal;
              font-size: 16px;
              line-height: 19px;
            }
            p{
              font-size: 12px;
              line-height: 14px;
            }
          }
        }
      }
    }
    .callback_section{
      margin-top: 0;
      .padding_content{
        padding-bottom: 0;
      }
      .callback_section_content{
        padding: 0;
        .image{
          img{
            width: 100%;
            height: auto;
          }
        }
        .text{
          h4{
            font-size: 22px;
            margin-bottom: 5px;
          }
          p{
            font-size: 16px;
          }
          form{
            width: 100%;
            .field{
              width: 100%;
              label{
                font-size: 14px;
                top: 16px;
              }
            }
            .button{
              .btn{
                width: 100%;
              }
            }
          }
        }
      }
    }
    .news_home{
      .news_home_iblocks{
        flex-wrap: wrap;
        .item{
          width: 100%;
          .date{
            margin-bottom: 0;
            span{
              font-size: 12px;
            }
          }
          h4{
            font-size: 14px;
            height: 50px;
          }
          a{
            font-size: 13px;
          }
        }
      }
    }
    .questions{
      padding-bottom: 0;
      .questions_content{
        .bar{
          display: none;
        }
        .top_iblock{
          flex-wrap: wrap;
          justify-content: flex-start;
          .item{
            margin-bottom: 10px;
            text-align: left;
            width: 120px;
            p{
              font-size: 14px;
            }
            &:before{
              display: none;
            }
          }
        }
        .questions_tabs_section{
          .tab{
            margin-top: 15px;
          }
          .tab_item{
            h4{
              font-size: 16px;
              line-height: 19px;
              margin-bottom: 10px;
            }
            p{
              font-size: 12px;
              line-height: 138.6%;
            }
          }
        }
      }
    }
    .document{
      padding-top: 0px;
      .document_content{
        .item{
          width: 50%;
          img{
            height: 54px;
          }
          span{
            margin-top: 5px;
            font-size: 14px;
            line-height: 17px
          }
        }
      }
    }
    .contacts_section{
      padding-top: 0;
      .title{
        margin-bottom: 15px;
      }
      .contacts_section_content{
        .info{
          a{
            font-size: 12px;
            line-height: 14px;
            margin-bottom: 10px;
          }
          h5{
            margin-top: 20px;
            font-size: 14px;
            line-height: 17px;
            margin-bottom: 10px;
          }
        }
        .right{
          h5{
            font-size: 20px;
            text-align: center;
            margin-bottom: 0;
          }
          p{
            font-size: 12px;
            line-height: 140.9%;
            text-align: center;
            opacity: 0.8;
          }
          form{
            width: auto;
            .field{
              label{
                font-size: 14px;
              }
            }
            .button{
              .btn{
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0; }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0; }

  a {
    text-decoration: none; }

  .btn {
    border: none;
    outline: transparent;
    background: -webkit-gradient(linear, left top, left bottom, from(#0079FE), to(#0079FE));
    background: -o-linear-gradient(top, #0079FE 0%, #0079FE 100%);
    background: linear-gradient(180deg, #0079FE 0%, #0079FE 100%);
    border-radius: 5px;
    color: #fff;
    font-weight: 100;
    font-size: 16px;
    -webkit-transition: .4s all;
    -o-transition: .4s all;
    transition: .4s all; }
  .btn.grey {
    background: rgba(201, 201, 201, 0.37);
    color: #333333; }
  .btn.grey:hover {
    background: rgba(219, 219, 219, 0.37); }
  .btn:hover {
    background: -webkit-gradient(linear, left top, left bottom, from(#0084fe), to(#0e81fe));
    background: -o-linear-gradient(top, #0084fe 0%, #0e81fe 100%);
    background: linear-gradient(180deg, #0084fe 0%, #0e81fe 100%); }

  form .field {
    position: relative;
    margin-bottom: 15px; }
  form .field label {
    font-weight: 100;
    line-height: 130.6%;
    color: #333333;
    position: absolute;
    top: 8px;
    left: 22px; }
  form .field input {
    outline: transparent;
    border: none;
    border: 1px solid #B7B7B7;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    padding: 14px 22px;
    background: transparent;
    color: #333333;
    font-weight: 100;
    font-family: 'SF UI Display'; }
  form .field textarea {
    outline: transparent;
    border: none;
    border: 1px solid #B7B7B7;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    padding: 14px 22px;
    background: transparent;
    color: #333333;
    font-weight: 100;
    font-family: 'SF UI Display'; }
  form .field .more {
    position: absolute;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    right: 0;
    top: 14px; }
  form .field .more a {
    color: #0079FE;
    font-weight: 300;
    font-size: 14px; }

  form .button {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between; }
  form .button .btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 160px;
    height: 50px; }

  form .lisence {
    margin-top: 15px; }
  form .lisence p {
    font-weight: 100;
    font-size: 12px !important;
    line-height: 14px;
    color: #333333; }
</style>

