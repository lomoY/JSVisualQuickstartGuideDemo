window.onload = pageInit;

function pageInit() {
    var checkBtn = document.getElementById("checkBtn"),
        usrPassword1 = document.getElementById("usrPassword1"),
        usrPassword2 = document.getElementById("usrPassword2");
    addEvent();
}

function addEvent() {
    checkBtn.onclick = function() {
        passwordCheck();
    }
}

function passwordCheck() {
    console.log("!");
    var psw1Value = usrPassword1.value, //.value应该是个方法才对，为什么没有括号
        psw2Value = usrPassword2.value;
    //关于Psw1Value.length,一个数字、一个小写英文、一个大写英文、一个汉字的length都是1
    var psw1ValueLength = psw1Value.length;

    if (psw1ValueLength < 6) {
        console.log("密码不得小于6位");
    } else {
        pswRule(psw1Value);
    }

}

function pswRule(psw1Value) {

    //弱密码
    var weakPsw = new Array();

    //纯数字0-9、纯小写字母、纯大写字母
    weakPsw[0] = /^(\d+|[a-z]+|[A-Z]+)$/;

    //中强密码
    var midlePsw = new Array();
    //等于6位，两种字符组合
    midlePsw[0] = /^[0-9a-z]{6}$/;
    midlePsw[1] = /^[0-9A-Z]{6}$/;
    midlePsw[2] = /^[a-zA-Z]{6}$/;
    //超过6位，一种字符组合
    midlePsw[3] = /^\d{7,}$/;
    //纯小写字母
    midlePsw[4] = /^[a-z]{7,}$/;
    //纯大写字母
    midlePsw[5] = /^[A-Z]{7,}$/;

    //强密码
    var strongPsw = new Array();
    //超过6位，两种字符组合
    strongPsw[0] = /^[0-9a-z]{7,}$/;
    strongPsw[1] = /^[0-9A-Z]{7,}$/;
    strongPsw[2] = /^[a-zA-Z]{7,}$/;

    //极强密码
    //超过6位，三种字符组合
    var maxPsw = new Array();
    maxPsw[0] = /^[0-9a-zA-Z]{7,}$/;


    var checkRegs = {
        weak: {
            reg: weakPsw,
            desc: '弱密码'
        },
        mid: midlePsw,
        strong: strongPsw
    };

    for (var i in checkRegs) {
        //item
        var items = [],
            status = false;
        var regs = checkRegs[i].reg,
            m = regs.length;

        for (var n = 0; n < m; n++) {
            if (items[n].test(psw1Value)) {
                status = true;
                break;
            }
        }

        if (status == true) {
            console.log(checkRegs[i].desc);
        }
    }

    if (weakCheck(psw1Value)) {
        console.log("弱密码");
    } else if (midleCheck(psw1Value)) {
        console.log("中强密码");
    } else if (strongCheck(psw1Value)) {
        console.log("强密码");
    } else if (maxCheck(psw1Value)) {
        console.log("极强的密码")
    }

    function weakCheck(psw1Value) {
        for (var i = 0; i < weakPsw.length; i++) {
            if (weakPsw[i].test(psw1Value)) {
                return true;
            };
        }
    }

    function midleCheck(psw1Value) {
        for (var i = 0; i < midlePsw.length; i++) {
            if (midlePsw[i].test(psw1Value)) {
                return true
            };
        }
    }

    function strongCheck(psw1Value) {
        for (var i = 0; i < strongPsw.length; i++) {
            if (strongPsw[i].test(psw1Value)) {
                return true
            };
        }
    }

    function maxCheck(psw1Value) {
        for (var i = 0; i < maxPsw.length; i++) {
            if (maxPsw[i].test(psw1Value)) {
                return true
            };
        }
    }
}
