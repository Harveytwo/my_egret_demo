/**
 * 场景切换特效类
 * by skave
 * (c) copyright 2018 - 2035
 * All Rights Reserved.
//切换场景的特效
//1.卷帘特效
//2.左右切换移动
//3.直接翻
//4.旋转掉落
//5.随机一种
 */
var ScreenMovies;
(function (ScreenMovies) {
    //当前舞台
    function MovieStart(_txnums, cb) {
        //创建一个截图Bitmap
        var taget = common.curStage();
        var w = common.curWidth();
        var h = common.curHeight();
        //新建一个group
        var loadTxGrp = new egret.Sprite();
        loadTxGrp.width = w;
        loadTxGrp.height = h;
        taget.addChild(loadTxGrp);
        //循环创建多个截图bitmap 这里num自由设置
        var tx1Number = 40;
        //每个横着的数量
        var Xnumber = 5;
        //高数量自动计算
        var Ynumber = tx1Number / Xnumber;
        for (var i = 0; i < tx1Number; i++) {
            //计算每个的XY及宽高
            var _mcW = w / Xnumber;
            var _mcH = h / Ynumber;
            var _mcX = i % Xnumber * _mcW;
            var _mcY = Math.floor(i / Xnumber) * _mcH;
            var renderTexture = new egret.RenderTexture();
            var mypic = renderTexture.drawToTexture(taget, new egret.Rectangle(_mcX, _mcY, _mcW, _mcH));
            var bmp = new egret.Bitmap;
            bmp.texture = renderTexture;
            bmp.anchorOffsetX = _mcW / 2;
            bmp.anchorOffsetY = _mcH / 2;
            bmp.x = _mcX + _mcW / 2;
            bmp.y = _mcY + _mcH / 2;
            loadTxGrp.addChild(bmp);
            if (_txnums == 5) {
                _txnums = Math.ceil(Math.random() * 4);
            }
            //开始特效
            switch (_txnums) {
                case 1:
                    var tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 359 }, 800, egret.Ease.circIn).call(onComplete, this);
                    break;
                case 2:
                    var my_x = -w;
                    if (!(i % 2)) {
                        my_x = w * 2;
                    }
                    var tw = egret.Tween.get(bmp);
                    tw.to({ x: my_x, alpha: 0 }, 800, egret.Ease.circIn).call(onComplete, this);
                    break;
                case 3:
                    var tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 0.2, scaleY: 1, alpha: 0, blurFliter: 0 }, 800, egret.Ease.backInOut).call(onComplete, this);
                    break;
                case 4:
                    var tw = egret.Tween.get(bmp);
                    tw.to({ alpha: 0 }, 900, egret.Ease.circIn).call(onComplete, this);
                    break;
                default:
                    var tw = egret.Tween.get(bmp);
                    tw.to({ scaleX: 1, scaleY: 0, alpha: 0 }, 800, egret.Ease.circIn).call(onComplete, this);
            }
        }
        var upNumber = 0;
        function onComplete(evt) {
            upNumber++;
            if (upNumber == tx1Number) {
                taget.removeChild(loadTxGrp);
                cb && cb();
            }
        }
    }
    ScreenMovies.MovieStart = MovieStart;
})(ScreenMovies || (ScreenMovies = {}));
//# sourceMappingURL=ScreenMovies.js.map