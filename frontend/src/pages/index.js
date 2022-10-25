import './index.styl'
import React, { useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { DecodeHintType, BrowserMultiFormatReader } from '@zxing/library'
import activeConfetti from '../lib/confetti.js'
// import { setWebAppManifest } from '../lib/dynamicMenifest';

const confettiColors = [
    '#E68F17',
    '#FAB005',
    '#FA5252',
    '#E64980',
    '#BE4BDB',
    '#0B7285',
    '#15AABF',
    '#EE1233',
    '#40C057'
]
const confettiConfig = {
    angle: 90,
    spread: 290,
    startVelocity: 50,
    elementCount: 120,
    decay: 0.8,
    delay: 4000,
    colors: confettiColors
}

const hints = new Map();
hints.set(DecodeHintType.TRY_HARDER, true)
hints.set(DecodeHintType.ASSUME_GS1, true)

const REPORT_TYPE = {
    'notSPC': 'SPC가 아닌데 SPC라고 떠요',
    'SPC': 'SPC인데 SPC가 아니라고 떠요'
}

class Index extends React.Component {

    reader = new BrowserMultiFormatReader(hints, 300)
    // reader = new BrowserBarcodeReader(
    //     300, hints
    // )

    state = {
        entered: '',
        detected: '',
        isSPC: null,
        itemInfo: null,
        streamNotSupported: false
    }

    confettiBox = React.createRef()

    scale = 1.0

    async _isSPC(code) {
        const response = await fetch(`https://isspc-back.saengwon-kim.workers.dev/?barcode=${code}`)
        const info = response.status === 200 ? await response.json() : {}
        const result = Object.keys(info).length > 0
        return { result, info }
    }

    handleChange(event) {
        this.setState({ entered: event.target.value })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const code = this.state.entered

        await this.fetchResult(code);
    }

    async fetchResult(code) {
        const { result, info } = await this._isSPC(code)
        this.setState({
            detected: code,
            isSPC: result,
            itemInfo: info
        }, () => {
            activeConfetti(this.confettiBox.current, confettiConfig)
        })

        window.ga && window.ga('send', 'event', 'Barcode', 'search', code)
    }

    onDetect = async data => {
        const code = data.text
        await this.fetchResult(code);
    }

    async setCaptureCanvas() {
        this.reader.pads = 0.0;
        this.reader.widthRatio = 1.0;
        this.reader.heightRatio = 1.0;
        this.reader.createCaptureCanvas = function(mediaElement) {
            const canvasElement = document.querySelector('#reader-canvas');
            const videoWidth = mediaElement.videoWidth;
            const videoHeight = mediaElement.videoHeight;
            const offsetWidth = mediaElement.offsetWidth;
            const offsetHeight = mediaElement.offsetHeight;
            this.videoWidth = videoWidth;
            this.videoHeight = videoHeight;
            this.offsetWidth = offsetWidth;
            this.offsetHeight = offsetHeight;
            this.widthRatio = videoWidth / offsetWidth;
            this.heightRatio = videoHeight / offsetHeight;
            const canvasStyle = "top: 0px; left: 0px; width:" + videoWidth + "px; height:"+ videoHeight + "px";
            canvasElement.style = canvasStyle;
            canvasElement.width = videoWidth;
            canvasElement.height = videoHeight;
            return canvasElement;
        };
        this.reader.drawFrameOnCanvas = function(srcElement) {
            var canvasElement = this.getCaptureCanvas();
            var ctx = canvasElement.getContext('2d');
            ctx.drawImage(srcElement, this.pads * this.widthRatio, this.pads * this.heightRatio, canvasElement.width, canvasElement.height,
                0, 0, canvasElement.width, canvasElement.height);
        };
    }

    async zoomin() {
        if (this.scale > 0.3) {
            this.scale -= 0.1
            const frame = document.querySelector('#reader-frame');
            const canvasElement = this.reader.getCaptureCanvas();
            // set position of frame
            let rect = frame.getBoundingClientRect();
            const pads = Math.min(rect.width, rect.height) * (1 - this.scale) * 0.5;
            this.reader.pads = pads;
            const boxShadow = "inset 0 0 0 " + pads + 'px' + " rgba(0, 0, 0, 0.5)";
            frame.style.boxShadow = boxShadow;
            const canvasTop = pads + 'px';
            const canvasLeft = pads + 'px';
            const canvasWidth = rect.width - 2 * pads
            const canvasHeight = rect.height - 2 * pads
            canvasElement.style = "top:" + canvasTop + "; left:" + canvasLeft;
            canvasElement.width = canvasWidth * this.reader.widthRatio;
            canvasElement.height = canvasHeight * this.reader.heightRatio;
        } else {
            this.scale = 0.3;
        }
    }

    async zoomout() {
        if (this.scale < 1) {
            this.scale += 0.1
            const frame = document.querySelector('#reader-frame');
            const canvasElement = this.reader.getCaptureCanvas();
            // set position of frame
            let rect = frame.getBoundingClientRect();
            const pads = Math.min(rect.width, rect.height) * (1 - this.scale) * 0.5;
            const boxShadow = "inset 0 0 0 " + pads + 'px' + " rgba(0, 0, 0, 0.5)";
            frame.style.boxShadow = boxShadow;
            const canvasTop = pads + 'px';
            const canvasLeft = pads + 'px';
            const canvasWidth = rect.width - 2 * pads
            const canvasHeight = rect.height - 2 * pads
            canvasElement.style = "top:" + canvasTop + "; left:" + canvasLeft;
            canvasElement.width = canvasWidth * this.reader.widthRatio;
            canvasElement.height = canvasHeight * this.reader.heightRatio;
        } else {
            this.scale = 1.0;
        }
    }

    async startDetect() {
        let selectedDeviceId;
        var constraintFacingMode = (location.hostname == 'localhost') ? "user" : "environment";
        var constraints = { audio: false, video: 
            { facingMode: constraintFacingMode, width: { min: 640, ideal: 2048, max: 4048 }, frameRate: {ideal: 10, max: 15}, focusMode: 'continuous' },
        };  // Filtering out audio doesnt seem to work.

        this.reader.decodeOnceFromConstraints(constraints, 'interactive')
        .then((result) => {
            this.onDetect(result)
        }).catch((err) => {
            console.error(err)
            this.setState({
                streamNotSupported: true
            })
        })
    }

    reset = () => {
        this.setState({
            entered: '',
            detected: '',
            isSPC: null,
            itemInfo: null,
        }, async () => {
            await this.startDetect()
            await this.setCaptureCanvas()
        })
    }

    async componentDidMount() {

        try {
            await this.startDetect()
            await this.setCaptureCanvas()
        } catch (error) {
            console.log(error)
            this.setState({
                streamNotSupported: true
            })
        }
    }

    render() {
        const { detected, streamNotSupported, isSPC } = this.state

        return (
            <div className="app">
                <Helmet>
                    <title>바스티유제빵소</title>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="(베타)SPC 브랜드 로고가 보이지 않는 제품이 SPC의 손길이 닿은 제품인지 알아볼 수 있도록 도와줍니다. https://github.com/saengwon-kim/isspc/issues 에서 프로젝트에 기여할 수 있습니다." />
                    <meta property="og:url" content="https://isspc.pages.dev" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="바스티유제빵소" />
                    <meta property="og:description" content="바코드만 찍으면 SPC의 손길이 닿은 제품인지 알 수 있는 페이지입니다! " />
                    <meta property="og:image" content="https://isspc.page.dev/isspc-logo.png" />
                    <meta property="og:locale" content="ko_KR" />
                    <link rel="manifest" id="dynamic-manifest" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72x72-white.png" />
                    <link rel="apple-touch-icon" sizes="96x96" href="/icons/icon-96x96-white.png" />
                    <link rel="apple-touch-icon" sizes="128x128" href="/icons/icon-128x128-white.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144-white.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152-white.png" />
                    <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192-white.png" />
                    <link rel="apple-touch-icon" sizes="384x384" href="/icons/icon-384x384-white.png" />
                    <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512x512-white.png" />
                </Helmet>
                <header className="header">
                    <span className="logo">
                        {/* <img src="isspc-logo.svg" alt="바스티유제빵소"/> */}
                        {/* <div className="beta"><span>BETA</span></div> */}
                    </span>
                </header>
                <main className="main">
                    <div ref={this.confettiBox} className="confetti" />
                    {!detected ?
                        <section className="search">
                            <h1>SPC 제품인지 확인해보세요</h1>
                            {streamNotSupported ?
                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor="barcode">바코드
                                        <input id="barcode" type="text" pattern="[0-9]*" maxLength="13" value={this.state.entered} onChange={this.handleChange.bind(this)} placeholder="8801068123456" />
                                    </label>
                                    <button type="submit" className="submit-btn" disabled={this.state.entered.length < 13}>찾기</button>
                                </form> :
                                <div className="reader">
                                    <p>아래 화면에 바코드가 나오도록 비춰주세요</p>
                                    <div className="reader-inner">
                                    <div className="reader-video" id="reader-video">
                                        <video ref={this.interactive} id="interactive" className="viewport" />
                                    </div>
                                    <div id="reader-frame"></div>
                                    </div>
                                    <canvas id="reader-canvas" />
                                    <button className="zoom-btn" onClick={this.zoomin.bind(this)}>+</button>
                                    <button className="zoom-btn" onClick={this.zoomout.bind(this)}>-</button>
                                </div>
                            }
                        </section> :
                        <section className="result">
                            {isSPC ?
                                <>
                                    <div className="message">
                                        <p>SPC 제품이</p>
                                        <p className="truth">맞습니다!</p>
                                    </div>
                                    {/* <dl>
                                    <dt className="product-title">제품명:</dt>
                                    <dd className="product-name">{this.state.itemInfo.content.name}</dd>
                                </dl> */}
                                    <dl>
                                        <dt className="barcode-title">바코드:</dt>
                                        <dd className="barcode-info">{detected}</dd>
                                    </dl>
                                </> :
                                <>
                                    <div className="message">
                                        <p>SPC 제품이</p>
                                        <p className="truth">아닙니다!</p>
                                    </div>
                                    <dl>
                                        <dt className="barcode-title">바코드:</dt>
                                        <dd className="barcode-info">{detected}</dd>
                                    </dl>
                                </>
                            }
                            <div className="actions">
                                <button className="reset" type="button" onClick={this.reset}>다른 제품 찾기</button>
                                <a className="report" href={this.getReportUrl(isSPC, detected)} target="_blank">오류 신고</a>
                            </div>
                        </section>
                    }
                </main>
                <footer className="footer">
                    <span>
                        <a href="https://github.com/saengwon-kim/isspc" target="_blank">
                            <img src="github-logo.png" alt="github" className="logo" />
                        </a>
                    </span>
                    <span>
                        <a href="https://isnamyang.nullfull.kr" target="_blank">
                            <img src="isnamyang-logo.svg" alt="남양유없" className="logo" />
                        </a>
                    </span>
                </footer>
            </div>
        )
    }

    getReportUrl(isSPC, barcode) {
        const reportType = isSPC ? REPORT_TYPE['notSPC'] : REPORT_TYPE['SPC']
        return `https://docs.google.com/forms/d/e/1FAIpQLSdr1TjcPBSri35YsGrqcraFvvcDMHfxQecyDqA7xbK8feNZ-g/viewform?usp=pp_url&entry.187227653=${reportType}&entry.1960789934=${barcode}`
    }
}


export default Index
