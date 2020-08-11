export default function(key) {
    return {
        get() {
            let path = key.split('.');
            return path.reduce((pValue, cValue) => {
                return pValue[cValue];
            }, getOwnerStore(this, path[0]));
        },

        set(value) {
            let path = key.split('.');
            let length = path.length - 1;
            let store = getOwnerStore(this, path[0]);

            for (let i = 0; i < length; i++) {
                if (store.hasOwnProperty(path[i])) {
                    store = store[path[i]];
                }
            }

            store[path[length]] = value;
        }
    }
}

function getOwnerStore(src, key) {
    do {
        if (typeof src.$data.store !== 'undefined' && typeof src.$data.store[key] !== 'undefined')
            return src.store;
    } while (src = (src.$storeParent || src.$parent));
}
