<template>
  <div class="page-root">
    <h1 class="header mb-3">{{contact_header}}</h1>
    <div class="row m-auto text-center">
        <div class="col-sm-12">
            <figure class="image ">
          <iframe class="has-ratio" style="width:100%;height:400px;"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.371518805488!2d-84.19333758479084!3d33.82852838066747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a8ae0a4d619f%3A0xe15adb92bc695bf6!2s4841%20Lewis%20Rd%2C%20Stone%20Mountain%2C%20GA%2030083%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1587969233084!5m2!1str!2str"  frameborder="0"  allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </figure>
        </div>
    </div>
    <div class="row m-auto text-center">
        <div class="col-sm-6">
            <h3 class="header mb-3">{{adress_header}}</h3>
            <p class="description mb-3"> &#9992; {{adress}}</p>
            <p class="description mb-3">&#9990 {{phone}}</p>
            <p class="description mb-3">
                 <a class="text-decoration-none" :href="'mailto:' + mail">
                <span>&#9993 {{mail}}</span>
          </a>
            </p>

        </div>
        <div class="col-sm-6">
            <ContactForm :form="contact.form"  />
        </div>

    </div>
  </div>
</template>
<script setup lang="ts">
    import {useStore} from '~/store/index';
    const store = useStore();
    const usa = store.getUsa;
    const contact = store.getContact;
    const contact_header = usa.contact_header;
    const adress_header = usa.adress_header;
    const adress = usa.adress;
    const phone = usa.phone;
    const mail = usa.mail;

</script>