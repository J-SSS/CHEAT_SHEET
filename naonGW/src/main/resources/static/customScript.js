// $.getScript("/ekp/resources/custom/biz/app/customScriptSample.js", function(){});
/**
 * 커스텀 스크립트 샘플
 */

(function ($, window){
    var CustomScriptSample = {
        name : 'CustomScriptSample',
        param : {
            colOf : null, // 설명
        },
        init : function(){

            this.beforeBind();
            this.bind();
            this.afterBind();

            UI.init();
        },
        beforeBind : function(){
            var me = CustomScriptSample;
        },
        bind : function(){
            var me = CustomScriptSample;
        },
        afterBind : function(){
        },
        data : {
            sampleData : null,
        },
        fn : {

            // 기본 함수
            selectSampleFunc : function () {
                var me = CustomScriptSample,
                    param = me.param;


            },

            // ajax 샘플
            selectSampleAjax : function () {
                var me = CustomScriptSample,
                    param = me.param;
                var options = {
                    url : '/service/smw/work/selectNumbering',
                    data: JSON.stringify({}),
                    contentType: 'application/json',
                    dataType : 'json',
                    target : document.body,
                    type : 'post',
                    async: false,
                    success : function(res, statusText) {

                    }
                };
                naon.http.ajax(options);
            },
        }
    };
    window.GW.addLocal('CustomScriptSample', CustomScriptSample)
})(jQuery, window);