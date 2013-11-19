# Marionette.loading

Marionette.loading simplifies creating loading views in your application.

With little work your views are automatically replaced with loading view when your collections and models are syncing with server.

## Usage

### Initializing

There are two ways to initialize Marionette.loading.

Easiest way is to use new View classes:
* Marionette.LoadingItemView
* Marionette.LoadingCollectionView
* Marionette.LoadingCompositeView

Alternatively you can call this.setupMarionetteLoading(); in any Marionette View (could be in initialize()). This will bind all necessary events.

### Setting loading view
Using Marionette.loading is similar to using emptyView in Marionette.CollectionView.

Just use loadingView property.

```js
LoadingView = Backbone.Marionette.ItemView.extend({
  template: "#show-loading"
});

Backbone.Marionette.CollectionView.extend({
  // ...

  loadingView: LoadingView
});
```

### Calling manually

Trigger 'loading' event on your collection or model to force your view to change to loading.
Trigger 'loaded' event to do opposite.

## Implementation details

Marionette.loading counts all events. If you trigger 'request' or 'loading' event N times it requires trigerring 'sync' or 'loaded' items N times as well.
