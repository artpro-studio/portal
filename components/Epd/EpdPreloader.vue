<template>
    <div class="preloader">
            <div class="preloader_content">
                <svg>
                    <g>
                        <path d="M 50,100 A 1,1 0 0 1 50,0"/>
                    </g>
                    <g>
                        <path d="M 50,75 A 1,1 0 0 0 50,-25"/>
                    </g>
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#F2A6FE;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#0079FE;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                </svg>
                <h6>Ваш файл загружается</h6>
                <p>это может занять от 5 до 10 минут</p>
            </div>
        </div>
</template>

<style lang="scss" scoped>
$transition-duration: 2s;
    $path-length: 157px; // Retrieved using SVG's getTotalLength()
    .preloader{
        background-color: rgba(255,255,255, 0.85);
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        justify-content: center;
        align-items: center;
        .preloader_content{
            text-align: center;
        }
        h6{
            font-style: normal;
            font-weight: 300;
            font-size: 30px;
            line-height: 36px;
            text-align: center;
            color: #333333;
            margin-bottom: 10px !important;
        }
        p{
            font-style: normal;
            font-weight: 100;
            font-size: 18px;
            line-height: 19px;
            text-align: center;
            color: #333333;
        }
    }
    .preloader svg {
    overflow: visible;
    width: 100px;
    height: 150px;

    g {
        animation: slide $transition-duration linear infinite;

        &:nth-child(2) {
        animation-delay: $transition-duration / 4;

        path {
            animation-delay: $transition-duration / 4;
            stroke-dasharray: 0px $path-length + 1;
            stroke-dashoffset: 1px;
        }
        }
    }

    path{
        stroke: url(#gradient);
        stroke-width: 20px;
        stroke-linecap: round;
        fill: none;
        stroke-dasharray: 0 $path-length;
        stroke-dashoffset: 0;
        animation: escalade $transition-duration cubic-bezier(0.8, 0, 0.2, 1) infinite;
    }
    }

    @keyframes slide {
    0% {
        transform: translateY(-50px);
    }
    100% {
        transform: translateY(50px);
    }
    }

    @keyframes escalade {
    0% {
        stroke-dasharray: 0 $path-length;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: $path-length - 1 $path-length;
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dasharray: $path-length - 1 $path-length;
        stroke-dashoffset: -($path-length - 1);
    }
    }
</style>
