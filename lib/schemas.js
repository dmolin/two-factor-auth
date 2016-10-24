let Schemas = Schemas || {}

Schemas.Mixins = {
  /**
   * This function makes a mixin required.
   * The rationale is to avoid mixin duplications when different forms require different mandatory rules
   * for the same type of mixin.
   * With this function it's just a matter of:
   *
   * myForm = new SimpleSchema({
   *   optional: Schemas.Mixins.postcode,
   *   required: Schemas.Mixins.required(Schemas.Mixins.postcode)
   * });
   */
  required: function(mixin) {
    return _.extend({}, mixin||{}, {optional:false});
  }
};

Schemas.Mixins.email = {
  type: String,
  regEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export default Schemas
