eqEd.RightCurlyBracketWrapper = function(symbolSizeConfig) {
    eqEd.RightBracketWrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightCurlyBracketWrapper";

    this.matchingBracketCtor = eqEd.LeftCurlyBracketWrapper;
    this.wholeBracket = new eqEd.RightCurlyWholeBracket("MathJax_Main", symbolSizeConfig);
    this.topBracket = null;
    this.middleBrackets = [];
    this.bottomBracket = null;

    this.wholeBracket.parent = this;

    this.domObj = this.buildDomObj();
    this.domObj.append(this.wholeBracket.domObj);

    this.childNoncontainers = [this.wholeBracket];

    this.padTop = 0;
    this.padBottom = 0;

    // Set up the width calculation
    var width = 0;
    this.properties.push(new Property(this, "width", width, {
        get: function() {
            return width;
        },
        set: function(value) {
            width = value;
        },
        compute: function() {
            var widthVal = 0;
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                widthVal = 0.511111 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                widthVal = 0.755555 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                widthVal = 0.8 * fontHeight;
            } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
                widthVal = 0.666666 * fontHeight;
            } else {
                widthVal = 0.666666 * fontHeight;
            }
            return widthVal;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the topAlign calculation
    var topAlign = 0;
    this.properties.push(new Property(this, "topAlign", topAlign, {
        get: function() {
            return topAlign;
        },
        set: function(value) {
            topAlign = value;
        },
        compute: function() {
            var topAlignVal = 0;
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                topAlignVal = 0.5 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                topAlignVal = 1.2 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                topAlignVal = 1.5 * fontHeight;
            } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
                topAlignVal = 1.665 * fontHeight;
            } else {
                var center = 0.15 + ((this.middleBrackets.length - 1) / 2) * 0.231 + 1.1;
                var bottom = center + 0.5 + ((this.middleBrackets.length - 1) / 2) * 0.231;
                var height = bottom + 1.65;
                topAlignVal = 0.5 * height * fontHeight;
            }
            return topAlignVal;
        },
        updateDom: function() {}
    }));

    // Set up the bottomAlign calculation
    var bottomAlign = 0;
    this.properties.push(new Property(this, "bottomAlign", bottomAlign, {
        get: function() {
            return bottomAlign;
        },
        set: function(value) {
            bottomAlign = value;
        },
        compute: function() {
            var bottomAlignVal = 0;
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                bottomAlignVal = 0.5 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                bottomAlignVal = 1.2 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                bottomAlignVal = 1.5 * fontHeight;
            } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
                bottomAlignVal = 1.665 * fontHeight;
            } else {
                var center = 0.15 + ((this.middleBrackets.length - 1) / 2) * 0.231 + 1.1;
                var bottom = center + 0.5 + ((this.middleBrackets.length - 1) / 2) * 0.231;
                var height = bottom + 1.65;
                bottomAlignVal = 0.5 * height * fontHeight;
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.RightCurlyBracketWrapper.prototype = Object.create(eqEd.RightBracketWrapper.prototype);
    eqEd.RightCurlyBracketWrapper.prototype.constructor = eqEd.RightCurlyBracketWrapper;
    eqEd.RightCurlyBracketWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper bracketWrapper rightBracketWrapper rightCurlyBracketWrapper"></div>')
    };
    // This is a callback that happens after this.heightRation gets calculated.
    eqEd.RightCurlyBracketWrapper.prototype.updateBracketStructure = function() {
        this.domObj.empty();
        this.wholeBracket = null;
        this.topBracket = null;
        this.middleBrackets = [];
        this.bottomBracket = null;
        this.childNoncontainers = [];
        if (this.heightRatio <= 1.5) {
            this.wholeBracket = new eqEd.RightCurlyWholeBracket("MathJax_Main", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
            this.wholeBracket = new eqEd.RightCurlyWholeBracket("MathJax_Size3", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
            this.wholeBracket = new eqEd.RightCurlyWholeBracket("MathJax_Size4", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else {
            var numberOfMiddleBrackets = Math.ceil((this.heightRatio - 3.4) / 0.231);
            numberOfMiddleBrackets = (numberOfMiddleBrackets % 2 !== 0) ? (numberOfMiddleBrackets + 1) : numberOfMiddleBrackets;
            this.topBracket = new eqEd.RightCurlyTopBracket(this.symbolSizeConfig);
            this.bottomBracket = new eqEd.RightCurlyBottomBracket(this.symbolSizeConfig);
            this.topBracket.parent = this;
            this.bottomBracket.parent = this;
            this.domObj.append(this.topBracket.domObj);
            this.domObj.append(this.bottomBracket.domObj);
            for (var i = 0; i < Math.ceil(0.5 * numberOfMiddleBrackets); i++) {
                var middleBracket = new eqEd.RightCurlyMiddleBracket(i, "middleVert", this.symbolSizeConfig);
                middleBracket.parent = this;
                this.domObj.append(middleBracket.domObj);
                this.middleBrackets.push(middleBracket);
            }
            var middleCurly = new eqEd.RightCurlyMiddleBracket(Math.ceil(0.5 * numberOfMiddleBrackets), "middleCurly", this.symbolSizeConfig);
            middleCurly.parent = this;
            this.domObj.append(middleCurly.domObj);
            this.middleBrackets.push(middleCurly);
            for (var i = (Math.ceil(0.5 * numberOfMiddleBrackets) + 1); i < (numberOfMiddleBrackets + 1); i++) {
                var middleBracket = new eqEd.RightCurlyMiddleBracket(i, "middleVert", this.symbolSizeConfig);
                middleBracket.parent = this;
                this.domObj.append(middleBracket.domObj);
                this.middleBrackets.push(middleBracket);
            }
            this.childNoncontainers = [this.topBracket].concat(this.middleBrackets).concat([this.bottomBracket]);
        }
    }
})();