_.extend(Marionette.View.prototype, {
    getLoadingView: function () {
        return Marionette.getOption(this, "loadingView");
    },
    __hideLoading: function (force) {
        --this.__loadingCount;
        if(this.__loadingCount < 0) this.__loadingCount = 0;
        if (this.__loadingCount == 0 || force) {
            delete this.__showingLoadingView;
            this.__loadingView && this.__loadingView.close();
            this.render();
        }
    },
    __showLoading: function () {
        this.__loadingCount = this.__loadingCount || 0;
        ++this.__loadingCount;
        var LoadingView = this.getLoadingView();
        if (LoadingView && !this.__showingLoadingView) {
            this.__showingLoadingView = true;
            var tempEl = $('<div>');
            this.$el.html('').append(tempEl);
            var loadingView = this.__loadingView = new LoadingView(_.extend({el: tempEl}, _.result(this, '__loadingViewAttributes')));
            loadingView.render();
        }
    },
    __loadingEvents: function () {
        _.each(['model', 'collection'], function (attr) {
            var target = this[attr];
            if (target) {
                this.listenTo(target, 'request', this.__showLoading, this);
                this.listenTo(target, 'loading', this.__showLoading, this);
                this.listenTo(target, 'sync', this.__hideLoading, this);
                this.listenTo(target, 'loaded', this.__hideLoading, this);
            }
        }, this);
    },
    __loadingViewAttributes: function () {
        return {collection: this.collection, model: this.model}
    },

    setupMarionetteLoading: function () {
        this.__loadingEvents();
        if (this.renderItemView) {
            this.renderItemView = function () {
                if (!this.__showingLoadingView) { // add is triggered before sync. if so do not render
                    Marionette.CompositeView.prototype.renderItemView.apply(this, arguments);
                }
            }
        }
    }
});

Marionette.LoadingItemView = Marionette.ItemView.extend({
    constructor: function () {
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
        this.setupMarionetteLoading();
    }
});

Marionette.LoadingCollectionView = Marionette.CollectionView.extend({
    constructor: function () {
        Marionette.CollectionView.prototype.constructor.apply(this, arguments);
        this.setupMarionetteLoading();
    }
});

Marionette.LoadingCompositeView = Marionette.CompositeView.extend({
    constructor: function () {
        Marionette.CompositeView.prototype.constructor.apply(this, arguments);
        this.setupMarionetteLoading();
    }
});
