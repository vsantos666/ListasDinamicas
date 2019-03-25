// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {  
  production: true,
  urlBackEndSso: "http://localhost:8080/b-sso/rest/",
  urlBackEndParam2: "http://localhost:8080/b-param/rest/",
  urlBackEndIngreso: "http://localhost:8080/b-ingreso/api/json/",
  urlBackEndListasDinamicas: "http://localhost:8080/b-listas-dinamicas/api/json/",
  urlFrontEndLogin: "http://localhost/sso/indexOce.html",
  urlBackEndOce: "http://localhost:8080/b-oce/rest/",
  urlBackEndAforo: "http://localhost:8080/b-aforo/rest/",
  urlBackEndSalida: "http://localhost:8080/b-salida/rest/",
  url_firmador: "http://localhost:12555/",
  host_ip: "http://localhost/",
  urlBackEndJbpm:"http://localhost:8080/b-jbpm-bandeja/rest/",
  urlBackEndParam: "https://suma-dev.aduana.gob.bo/b-param/rest/",
  url_backEnd_pki: "http://localhost:8080/b-pki/rest/"
};
