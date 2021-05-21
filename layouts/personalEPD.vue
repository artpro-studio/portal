<template>
  <div class="wrapper lk_page">
    <Sidebar/>
    <div class="lk_content">
      <Header />
      <nuxt />
    </div>
    <Snackbar />
  </div>
</template>

<script>
  import Sidebar from '/components/personal/epd/sidebar'
  import Header from '/components/personal/epd/header'
  import Snackbar from  '~/components/snackbar-main'

  export default {
    components:{
      Sidebar, Header, Snackbar
    }
  }
</script>

<style lang="scss">
  body {
    background: rgba(0, 121, 254, 0.02); }

  .lk_page {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%; }
  .lk_page .sidebar {
    background: #FFFFFF;
    -webkit-box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.05);
    border-radius: 0px 30px 30px 0px;
    width: 72px;
    position: fixed;
    height: 100%;
    z-index: 10; }
  .lk_page .sidebar .user {
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 25px;
    display: none;
    position: relative; }
  .lk_page .sidebar .user .image {
    width: 27px;
    height: 27px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 6px;
    border-radius: 50%; }
  .lk_page .sidebar .user .user_info {
    height: 25px; }
  .lk_page .sidebar .user .user_info p {
    font-weight: normal;
    font-size: 12px;
    line-height: 1; }
  .lk_page .sidebar .user .user_info span {
    display: block;
    font-weight: 300;
    font-size: 8px;
    line-height: 15px;
    color: #B7B7B7; }
  .lk_page .sidebar .burger {
    height: 55px;
    border-bottom: 1px solid #EBEBEB;
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
    cursor: pointer;
    margin-bottom: 20px; }
  .lk_page .sidebar .burger span {
    display: block;
    width: 22px;
    height: 1px;
    background-color: #B7B7B7;
    position: relative; }
  .lk_page .sidebar .burger span:before {
    content: '';
    width: 22px;
    height: 1px;
    background-color: #B7B7B7;
    position: absolute;
    top: -6px;
    left: 0; }
  .lk_page .sidebar .burger span:after {
    content: '';
    width: 22px;
    height: 1px;
    background-color: #B7B7B7;
    position: absolute;
    top: 6px;
    left: 0; }
  .lk_page .sidebar .burger i {
    display: none; }
  .lk_page .sidebar .menu nav ul li {
    margin-bottom: 15px; }
  .lk_page .sidebar .menu nav ul li a {
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
    margin-left: auto;
    margin-right: auto;
    width: 42px;
    height: 39px;
    border-radius: 6px;
    background: #fff;
    -webkit-transition: .4s all;
    -o-transition: .4s all;
    transition: .4s all; }
  .lk_page .sidebar .menu nav ul li a svg {
    height: 20px; }
  .lk_page .sidebar .menu nav ul li a svg path {
    fill: #B7B7B7;
    -webkit-transition: .4s all;
    -o-transition: .4s all;
    transition: .4s all; }
  .lk_page .sidebar .menu nav ul li a:hover svg path {
    fill: #0079FE; }
  .lk_page .sidebar .menu nav ul li a.active {
    background: #0079FE;
    -webkit-box-shadow: 0px 3px 10px rgba(0, 121, 254, 0.5);
    box-shadow: 0px 3px 10px rgba(0, 121, 254, 0.5); }
  .lk_page .sidebar .menu nav ul li a.active svg path {
    fill: #fff; }
  .lk_page .sidebar .menu_wrap {
    margin-top: 5px;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: none;
    opacity: 0;
    position: relative; }
  .lk_page .sidebar .menu_wrap nav ul li a {
    font-weight: 300;
    font-size: 14px;
    line-height: 210.7%;
    color: #7C7C7C; }
  .lk_page .sidebar .sidebar_social {
    display: none;
    position: absolute;
    bottom: 60px;
    left: 10px;
    -webkit-transition: .4s all;
    -o-transition: .4s all;
    transition: .4s all; }
  .lk_page .sidebar .sidebar_social h4 {
    font-weight: 100;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 10px; }
  .lk_page .sidebar .sidebar_social a {
    margin-right: 17px; }
  .lk_page .sidebar .sidebar_social a img {
    height: 19px;
    width: 19px; }
  .lk_page .sidebar .logout{
    display: none;
    position: absolute;
    bottom: 0px;
    left: 0px;
    -webkit-transition: .4s all;
    -o-transition: .4s all;
    transition: .4s all;
    width: 100%;
    box-sizing: border-box;
  }
  .lk_page .sidebar .logout a{
    background: #0079FE;
    display: block;
    color: #fff;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    svg{
      fill: #fff;
      path{
        fill: #fff;
      }
      line{
        fill: #fff;
      }
    }
  }
  .lk_page .lk_content {
    width: 100%;
    padding-left: 110px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; }
  .lk_page .header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 56px;
    border-bottom: 1px #E1EFFF solid;
    margin-left: -40px;
    padding-left: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; }
  .lk_page .header .logo a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    text-decoration: none;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #ADAEAF; }
  .lk_page .header .logo a svg {
    height: 31px;
    margin-right: 5px; }
  .lk_page .header .logo a svg path {
    fill: #0079FE; }
  .lk_page .header .menu {
    width: 50%; }
  .lk_page .header .menu ul {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between; }
  .lk_page .header .menu ul li {
    display: inline-block; }
  .lk_page .header .menu ul li a {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #7C7C7C;
    opacity: 0.7;
    -webkit-transition: .4s all;
    -o-transition: .4s all;
    transition: .4s all; }
  .lk_page .header .menu ul li a:hover {
    opacity: 1; }
  .lk_page .header .header_info {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex; }
  .lk_page .header .header_info .user {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-right: 1px #E1EFFF solid;
    height: 100%;
    padding-right: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 55px; }
  .lk_page .header .header_info .user .image {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 33px;
    height: 33px;
    border-radius: 50%;
    margin-right: 10px; }
  .lk_page .header .header_info .user .user_info p {
    font-weight: normal;
    font-size: 14px;
    line-height: 10px; }
  .lk_page .header .header_info .user .user_info span {
    font-weight: 300;
    font-size: 10px;
    line-height: 1;
    color: #B7B7B7; }
  .lk_page .header .header_info .icon {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 55px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 63px;
    border-right: 1px #E1EFFF solid;
    -webkit-transition: .4s all;
    -o-transition: .4s all;
    transition: .4s all; }
  .lk_page .header .header_info .icon:hover {
    background-color: #E1EFFF; }
  .lk_page .header .header_info .icon svg {
    height: 20px; }
  .lk_page .header .header_info .icon svg path {
    fill: #B7B7B7; }
  .lk_page .header .header_info .icon .icon_content {
    position: relative; }
  .lk_page .header .header_info .icon .icon_content span {
    position: absolute;
    top: -2px;
    right: -5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #F68C8C;
    font-weight: bold;
    font-size: 6px;
    line-height: 7px;
    color: #FFFFFF;
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
    justify-content: center; }

  @media screen and (max-width: 1200px) {
    .lk_page .header {
      padding-left: 10px; }
    .lk_page .header .menu {
      width: 45%; } }

  @media screen and (max-width: 996px) {
    .lk_page .sidebar {
      border-radius: 0px 5px 5px 0px;
      height: 45px;
      width: 45px; }
    .lk_page .sidebar .burger {
      border-bottom: 0;
      height: 45px; }
    .lk_page .sidebar .burger span {
      -webkit-transition: .4s all;
      -o-transition: .4s all;
      transition: .4s all;
      width: 18.75px; }
    .lk_page .sidebar .burger span:before {
      -webkit-transition: .4s all;
      -o-transition: .4s all;
      transition: .4s all;
      width: 18.75px; }
    .lk_page .sidebar .burger span:after {
      -webkit-transition: .4s all;
      -o-transition: .4s all;
      transition: .4s all;
      width: 18.75px; }
    .lk_page .sidebar .menu {
      display: none;
      opacity: 0;
      -webkit-transition: .4s all;
      -o-transition: .4s all;
      transition: .4s all;
      position: relative; }
    @-webkit-keyframes menuActive {
      0% {
        opacity: 0; }
      100% {
        opacity: 1; } }
    @keyframes menuActive {
      0% {
        opacity: 0; }
      100% {
        opacity: 1; } }
    @-webkit-keyframes slideMenu {
      0% {
        opacity: 1;
        left: -150px; }
      100% {
        opacity: 1;
        left: 0; } }
    @keyframes slideMenu {
      0% {
        opacity: 1;
        left: -150px; }
      100% {
        opacity: 1;
        left: 0; } }
    @-webkit-keyframes slideMenu10 {
      0% {
        opacity: 1;
        left: -150px; }
      100% {
        opacity: 1;
        left: 10px; } }
    @keyframes slideMenu10 {
      0% {
        opacity: 1;
        left: -150px; }
      100% {
        opacity: 1;
        left: 10px; } }
    @-webkit-keyframes slidelogout {
      0% {
        opacity: 1;
        left: -150px; }
      100% {
        opacity: 1;
        left: 0px; } }
    @keyframes slidelogout {
      0% {
        opacity: 1;
        left: -150px; }
      100% {
        opacity: 1;
        left: 0px; } }
    .lk_page .sidebar.active {
      height: 100%;
      width: 160px;
      -webkit-animation: menuActive .6s;
      animation: menuActive .6s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards; }
    .lk_page .sidebar.active .user {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      opacity: 0;
      -webkit-animation: slideMenu .6s;
      animation: slideMenu .6s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      -webkit-animation-delay: .6s;
      animation-delay: .6s;
      -webkit-animation-duration: .4s;
      animation-duration: .4s; }
    .lk_page .sidebar.active .burger {
      border-bottom: 1px solid #EBEBEB; }
    .lk_page .sidebar.active .burger span {
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg); }
    .lk_page .sidebar.active .burger span:before {
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
      top: 0; }
    .lk_page .sidebar.active .burger span:after {
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
      top: 0; }
    .lk_page .sidebar.active .burger i {
      display: block;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      color: #ADAEAF;
      margin-left: 5px;
      font-style: normal; }
    .lk_page .sidebar.active .menu {
      display: block;
      -webkit-animation: slideMenu .6s;
      animation: slideMenu .6s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      -webkit-animation-delay: .6s;
      animation-delay: .6s;
      -webkit-animation-duration: .4s;
      animation-duration: .4s; }
    .lk_page .sidebar.active .menu nav ul {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0 10px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box; }
    .lk_page .sidebar.active .menu nav ul li a {
      width: 29.92px;
      height: 27.79px; }
    .lk_page .sidebar.active .menu nav ul li a svg {
      height: 14px; }
    .lk_page .sidebar.active .menu_wrap {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      opacity: 0;
      -webkit-animation: slideMenu .6s;
      animation: slideMenu .6s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      -webkit-animation-delay: .6s;
      animation-delay: .6s;
      -webkit-animation-duration: .4s;
      animation-duration: .4s; }
    .lk_page .sidebar.active .sidebar_social {
      display: block;
      opacity: 0;
      -webkit-animation: slideMenu10 .6s;
      animation: slideMenu10 .6s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      -webkit-animation-delay: .6s;
      animation-delay: .6s;
      -webkit-animation-duration: .4s;
      animation-duration: .4s;
      left: 10px; }
    .lk_page .sidebar.active .logout {
      display: block;
      opacity: 0;
      -webkit-animation: slidelogout .6s;
      animation: slidelogout .6s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      -webkit-animation-delay: .6s;
      animation-delay: .6s;
      -webkit-animation-duration: .4s;
      animation-duration: .4s;
      left: 10px; }
    .lk_page .header {
      padding-left: 65px;
      margin-left: 0;
      height: 46px; }
    .lk_page .header .menu {
      display: none; }
    .lk_page .header .header_info .user {
      height: 46px;
      display: none; }
    .lk_page .header .header_info .icon {
      height: 46px; }
    .lk_page .header .header_info .icon.message {
      border-left: 1px #E1EFFF solid; }
    .lk_page .header .header_info .icon svg {
      height: 15px; }
    .lk_page .lk_content {
      padding-left: 0; } }

  @media screen and (max-width: 650px) {
    .lk_page .header {
      padding-left: 55px; }
    .lk_page .header .logo a {
      font-size: 10px;
      line-height: 12px; }
    .lk_page .header .logo a svg {
      height: 22px;
      margin-right: 2px; }
    .lk_page .header .header_info .icon {
      width: 50px; }
    .lk_page .header .header_info .icon .icon_content span {
      line-height: 6px; } }
  .m-message.m-message--info{
    background: #0079FE !important;
    box-shadow: 0px 0px 15px rgba(0, 121, 254, 0.11) !important;
    border-radius: 5px !important;
    color: #fff !important;
    .m-message--title{
      font-weight: normal;
    }
    .m-message--description{
      color: #fff !important;
      margin-top: 0 !important;
      font-weight: 100 !important;
    }
    svg{
      path{
        fill:#fff !important;
      }
    }
  }
  .m-message.m-message--success{
    background: #83CE70 !important;
    box-shadow: 0px 0px 15px rgba(130, 206, 112, 0.11) !important;
    border-radius: 5px !important;
    color: #fff !important;
    .m-message--title{
      font-weight: normal;
    }
    .m-message--description{
      color: #fff !important;
      margin-top: 0 !important;
      font-weight: 100 !important;
    }
    svg{
      path{
        fill:#fff !important;
      }
    }
  }
  .m-message.m-message--error{
    background: #F78C8C !important;
    box-shadow: 0px 0px 15px rgba(246, 140, 140, 0.11) !important;
    border-radius: 5px !important;
    color: #fff !important;
    .m-message--title{
      font-weight: normal;
    }
    .m-message--description{
      color: #fff !important;
      margin-top: 0 !important;
      font-weight: 100 !important;
    }
    svg{
      path{
        fill:#fff !important;
      }
    }
  }
</style>
