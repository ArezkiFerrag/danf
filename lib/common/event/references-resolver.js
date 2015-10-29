'use strict';

/**
 * Expose `ReferencesResolver`.
 */
module.exports = ReferencesResolver;

/**
 * Initialize a new sequences references resolver.
 */
function ReferencesResolver() {
}

ReferencesResolver.defineImplementedInterfaces(['danf:event.referencesResolver']);

ReferencesResolver.defineDependency('_referenceResolver', 'danf:manipulation.referenceResolver');
ReferencesResolver.defineDependency('_flowContext', 'danf:event.flowContext');
ReferencesResolver.defineDependency('_config', 'object');

/**
 * Reference resolver.
 *
 * @var {danf:manipulation.referenceResolver}
 * @api public
 */
Object.defineProperty(ReferencesResolver.prototype, 'referenceResolver', {
    set: function(referenceResolver) {
        this._referenceResolver = referenceResolver
    }
});

/**
 * Flow context.
 *
 * @var {danf:event.flowContext}
 * @api public
 */
Object.defineProperty(ReferencesResolver.prototype, 'flowContext', {
    set: function(flowContext) {
        this._flowContext = flowContext
    }
});

/**
 * Config.
 *
 * @var {object}
 * @api public
 */
Object.defineProperty(ReferencesResolver.prototype, 'config', {
    set: function(config) { this._config = config; }
});

/**
 * @interface {danf:event.referencesResolver}
 */
ReferencesResolver.prototype.resolve = function(source, context, inText) {
    var resolvedReferences = source;

    if (source && 'object' === typeof source) {
        resolvedReferences = Array.isArray(source) ? [] : {};

        for (var key in source) {
            resolvedReferences[key] = this.resolve(source[key], context);
        }
    } else if ('string' === typeof resolvedReferences) {
        resolvedReferences = this._referenceResolver.resolve(resolvedReferences, '@', context, inText);

        if ('string' === typeof resolvedReferences) {
            resolvedReferences = this._referenceResolver.resolve(resolvedReferences, '$', this._config, inText);
        }

        if ('string' === typeof resolvedReferences) {
            resolvedReferences = this._referenceResolver.resolve(resolvedReferences, '!', this._flowContext.getAll(), inText);
        }
    }

    return resolvedReferences;
}

/**
 * @interface {danf:event.referencesResolver}
 */
ReferencesResolver.prototype.resolveSpecific = function(source, type, context, inText) {
    var resolvedReferences = source;

    if (source && 'object' === typeof source) {
        resolvedReferences = Array.isArray(source) ? [] : {};

        for (var key in source) {
            resolvedReferences[key] = this.resolve(source[key], context);
        }
    } else if ('string' === typeof resolvedReferences) {
        resolvedReferences = this._referenceResolver.resolve(resolvedReferences, type, context, inText);
    }

    return resolvedReferences;
}