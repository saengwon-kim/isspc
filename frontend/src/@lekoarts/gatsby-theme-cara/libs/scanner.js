import './scanner.styl'
import React, { useState, useRef } from 'react'
import { DecodeHintType, BrowserMultiFormatReader } from '@zxing/library'
import activeConfetti from './confetti.js'
import Quagga from '@ericblade/quagga2';

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

class IsSPC extends React.Component {

    reader = new BrowserMultiFormatReader(hints, 300)

    initscale = 0.5
    scale = 0.5

    state = {
        entered: '',
        detected: '',
        isSPC: null,
        itemInfo: null,
        streamNotSupported: true
    }

    confettiBox = React.createRef()

    async _isSPC(code) {
        var info = null
        var result = false
        const response = await fetch(`https://isspc-back.saengwon-kim.workers.dev/?barcode=${code}`)
        if (response.status == 200) {
            // info = JSON.parse(await handleRequest(code))
            info = await response.json()
            result = (Object.keys(info).length > 0 ? info.isspc : false)
        } else {
            alert("바코드 분류 서버가 응답하지 않습니다.")
            info = {}
            result = false
        }
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
        if (code.length < 13 || code.slice(0, 3) != "880") {
            alert("바코드가 형식에 맞지 않습니다. 결과가 부정확할 수 있습니다.")
        }
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
        const scale = this.scale;
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
            // const canvasStyle = "top: 0px; left: 0px; width:" + videoWidth + "px; height:"+ videoHeight + "px";
            // canvasElement.style = canvasStyle;
            // set position of frame
            const frame = document.querySelector('#reader-frame');
            let rect = frame.getBoundingClientRect();
            const pads = Math.min(rect.width, rect.height) * (1 - scale) * 0.5;
            this.pads = pads;
            const boxShadow = "inset 0 0 0 " + pads + 'px' + " rgba(0, 0, 0, 0.5)";
            frame.style.boxShadow = boxShadow;
            const canvasTop = pads + 'px';
            const canvasLeft = pads + 'px';
            const canvasWidth = rect.width - 2 * pads
            const canvasHeight = rect.height - 2 * pads
            canvasElement.style = "top:" + canvasTop + "; left:" + canvasLeft;
            canvasElement.width = canvasWidth * this.widthRatio;
            canvasElement.height = canvasHeight * this.heightRatio;
            
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

    async DetectFromFile(){
        // File based scanning
        const fileinput = document.getElementById('reader-input');
        if (fileinput.files.length == 0) {
            // No file selected, ignore 
            return;
        }
        var imageFile = fileinput.files[0];
        const filetype = imageFile.name.split('.').pop();
        if (filetype.toLowerCase() === 'heic') {
            // let file = fileinput.files[0];
            // let blob = file.slice(0, file.size, 'image/heic'); 
            // const conversionResult = await heic2any({ blob, toType: "image/png" });
            // imageFile = new File([conversionResult], 'converted.png', {type: 'image/png'});
            alert("HEIC 형식은 아직 지원하지 않습니다.")
        }
        var reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result;
            Quagga.decodeSingle({
                src: imageData,
                numOfWorkers: 0,  // Needs to be 0 when used within node
                inputStream: {
                    size: 800  // restrict input-size to be 800px in width (long-side)
                },
                decoder: {
                    readers: [
                        "ean_reader", {
                        format: "ean_reader",
                        config: {
                            supplements: [
                                'ean_5_reader', 'ean_2_reader'
                            ]
                        }},
                        "code_128_reader", "i2of5_reader"] // List of active readers
                },
            }, (result) => {
                console.log(result)
                try {
                    this.fetchResult(result.codeResult.code);
                } catch {
                    console.log("not detected");
                    alert("이미지에서 바코드를 읽을 수 없습니다");
                }
            });
        }
        reader.readAsDataURL(imageFile);
    }

    async startDetect() {
        var constraintFacingMode = (location.hostname == 'localhost') ? "user" : "environment";
        var constraints = { audio: false, video: 
            { facingMode: constraintFacingMode, width: { min: 640, ideal: 1280, max: 2560 }, frameRate: {ideal: 24, max: 60}, focusMode: 'continuous' },
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
            streamNotSupported: true
        }, async () => {
            this.reader.reset()
            this.scale = this.initscale
        })
    }

    async componentDidMount() {

        try {
            this.reader.reset()
            this.scale = this.initscale
        } catch (error) {
            console.log(error)
            this.setState({
                streamNotSupported: true
            })
        }
    }

    async StopScanner() {
        this.setState({
            streamNotSupported: true
        }, async() => {
            this.reader.reset()
            this.scale = this.initscale
        })
    }

    async StartScanner() {
        this.setState({
            streamNotSupported: false
        }, async () => {
            this.reader.reset()
            this.scale = this.initscale
            await this.startDetect()
            await this.setCaptureCanvas()
        })
    }

    render() {
        const { detected, streamNotSupported, isSPC } = this.state

        return (
            <div className="Scanner">
                    <div ref={this.confettiBox} className="confetti" />
                    {!detected ?
                        <section className="search">
                            <h1>SPC 제품인지 확인해보세요</h1>
                            <span className="remark-notice">아직은 베타버전이며 880으로 시작하는 유통바코드만 분류할 수 있습니다.</span>
                            {streamNotSupported ?
                                <div className="no-reader">
                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor="barcode">바코드
                                        <input id="barcode" type="text" pattern="[0-9]*" maxLength="18" value={this.state.entered} onChange={this.handleChange.bind(this)} placeholder="8801068123456" />
                                    </label>
                                    <button type="submit" className="submit-btn" disabled={this.state.entered.length < 8}>찾기</button> <a onClick={this.StartScanner.bind(this)} className="submit-btn">스캔</a> <label htmlFor="reader-input" className="submit-btn">업로드</label><input type="file" id="reader-input" className="image_inputType_file" accept="image/*;capture=camera" onChange={this.DetectFromFile.bind(this)}></input><div id="uploaded" width="300px"></div>
                                </form>
                                </div> :
                                <div className="reader">
                                    <p>아래 화면에 바코드가 나오도록 비춰주세요</p>
                                    <div className="controlBox">
                                        <button className="submit-btn" onClick={this.zoomin.bind(this)}>영역축소</button> <button className="submit-btn" onClick={this.zoomout.bind(this)}>영역확대</button> <button className="submit-btn" onClick={this.StopScanner.bind(this)}>스캔 멈추기</button>
                                    </div><br></br>
                                    <div className="reader-inner">
                                    <div className="reader-video" id="reader-video">
                                        <video ref={this.interactive} id="interactive" className="viewport" />
                                    </div>
                                    <div id="reader-frame"></div>
                                    </div>
                                    <canvas id="reader-canvas" />
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
                                    <dl>
                                    <dt className="manufact-title">제조원:</dt>
                                    <dd className="manufact-name">{this.state.itemInfo.manufacturer}</dd>
                                    </dl>
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
                            {this.state.itemInfo.type === "product" ?
                                <>
                                <dl>
                                    <dt className="prodname-title">제품명:</dt>
                                    <dd className="prodname-info">{this.state.itemInfo.name}</dd>
                                </dl>
                                </> :
                                <></>
                            }
                            <div className="actions">
                                <button className="reset" type="button" onClick={this.reset}>다른 제품 찾기</button>
                                <a className="report" href={this.getReportUrl(isSPC, detected)} target="_blank">오류 신고</a>
                            </div>
                        </section>
                    }
            </div>
        )
    }

    getReportUrl(isSPC, barcode) {
        const reportType = isSPC ? REPORT_TYPE['notSPC'] : REPORT_TYPE['SPC']
        return `https://docs.google.com/forms/d/e/1FAIpQLSdr1TjcPBSri35YsGrqcraFvvcDMHfxQecyDqA7xbK8feNZ-g/viewform?usp=pp_url&entry.187227653=${reportType}&entry.1960789934=${barcode}`
    }
}

export default IsSPC
