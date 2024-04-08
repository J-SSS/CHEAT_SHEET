// 관내 데크 3개
// A-8,
// B-3 : 00011001,
// C-4 : 00012001

/**
 * 앵봉산 가족캠핑장
 * https://camp.xticket.kr/web/main
 */
(function(){
    var RM = {
        param : {
            openCheck : false,
            trgtMonth : '',
            trgtDate : '',
            trgtCode : []

        },
        init : function (month, date, code){
            RM.param.trgtMonth = month;
            RM.param.trgtDate = date;
            RM.param.trgtCode = code;
            console.log('########## RESERVE MASTER 초기화 ##########');

            RM.fn.openChecker();
        },

        fn : {
            /** 오픈 여부 체크 */
            openChecker : function (){
                var me = this;
                $.post('/Web/Book/GetBookPlayDate.json', {play_month : RM.param.trgtMonth}, function(result,status,jqXHR){
                    var rsltData = result.data['bookPlayDateList']
                    var isOpen = rsltData.length > 0;

                    var serverTime = jqXHR.getResponseHeader('Date');
                    var dateObject = new Date(serverTime);
                    console.log('서버 시간:', dateObject);

                    if(isOpen && !RM.param.openCheck){
                        RM.param.openCheck = false;
                        me.fakeLogger(); // 목표 일자에 대한 조회 기록 생성
                        me.onReservation(); // 실제 예약 요청 전송
                    } else if(!isOpen && !RM.param.openCheck) {
                        setTimeout(function(){
                            me.openChecker();
                        },500)
                    }
                });
            },

            /** 목표 일자에 대한 조회 기록 생성 */
            fakeLogger : function (){
                var params = {
                    product_group_code : '0001',
                    start_date : RM.param.trgtDate,
                    end_date : RM.param.trgtDate,
                    book_days : '1',
                    two_stay_days : '0',
                    shopCode: '110821190701'
                };
                $.post('/Web/Book/GetBookProduct010001.json', params,
                    function(result){
                        console.log('########## 요청 로그 생성 ##########');
                    })
            },

            /** 실제 예약 요청 전송 */
            onReservation : function (){
                // 캡챠 입력 후 실행 할 함수 먼저 오버라이딩
                window.model.clickReservationConfirm = function(){
                    var codes = RM.param.trgtCode;
                    $.each(codes,function (i,e){
                        var params =
                            {
                                product_group_code : '0001',
                                play_date : RM.param.trgtDate,
                                product_code : e,
                                captcha : window.model.captcha()
                            };
                        $.post('/Web/Book/Book010001.json', params, function(result) {
                            if (result.error) {
                                alert(result.error.message);
                                if (result.error.code == '0001') { // 보안문자 틀림
                                    self.refreshCaptchaImage();
                                    self.captcha('');
                                }
                                return;
                            }

                            if (result.data.success) {
                                if(result.data.payment_limit_minute!=""){
                                    alert('[예약이 완료되었습니다. ' + result.data.payment_limit_minute + '까지 결제하시지 않으면 자동 취소됩니다.]');
                                }else{
                                    alert('[예약이 완료되었습니다.]');
                                }
                            } else {
                                return alert('예매를 실패하였습니다.');
                            }
                        }
                        );
                    })

                }

                // 캡챠 화면 오픈
                window.model.refreshCaptchaImage();
                window.model.captcha('');
                window.showReservationLayer();
            }
        }
    }
    window.RM = RM;
})();


RM.init('202405','20240505',['00011001','00012001']);

// RM.init();
// 월(yyyyMM), 일(yyyyMMdd), 코드 순서로 입력
// '202405','20240505','00011001'
// '202405','20240505','00012001'

// 관내 데크
// A-8 :
// B-3 : 00011001,
// C-4 : 00012001
