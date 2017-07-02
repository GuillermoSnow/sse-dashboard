'use strict';


module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  var ds = server.datasources.mysql;

  router.get('/', server.loopback.status());

  router.get('/tiempoObtenerTitulo', (req, res) => {
    var parametro1 = req.query.year;
    ds.connector.query("select  count( distinct persona.PERSONA_ID) AS Cantidad, "+
        "extract(year from formacion.FORMACION_FEXPED_TITULO)- "+
        "extract(year from formacion.FORMACION_FEGRESO) as Tiempo "+
        "from formacion join persona on "+
        "formacion.PERSONA_ID = persona.PERSONA_ID  "+
        "join programa_academico on programa_academico.PROGRAMA_ID = formacion.PROGRAMA_ID "+
        "join facultad on programa_academico.FACULTAD_ID= facultad.FACULTAD_ID  "+
        "where extract(year from formacion.FORMACION_FINGRESO) = "+parametro1+" and facultad.FACULTAD_ID=1 "+
        "group by extract(year from formacion.FORMACION_FEXPED_TITULO)- "+
        "extract(year from formacion.FORMACION_FEGRESO) ;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  
  router.get('/vistaDos', (req, res) => {
    var parametro2 = req.query.year;
    ds.connector.query("select count(distinct persona.PERSONA_ID) as Cantidad, tipo.TIPO_DESC from persona join formacion on "+
    " persona.PERSONA_ID= formacion.PERSONA_ID join 	programa_academico on programa_academico.PROGRAMA_ID ="+
     " formacion.PROGRAMA_ID join tipo on tipo.TIPO_ID = programa_academico.TIPO_ID " +
    " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID "+
    " where extract(year from formacion.FORMACION_FINGRESO) = "+parametro2+" and facultad.FACULTAD_ID=1"+
    " group by tipo.TIPO_DESC ;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaTres', (req, res) => {
    var parametro1 = req.query.year;
    ds.connector.query("select count(distinct persona.Persona_ID) as Campo from persona" +
    " left join experiencia_laboral on experiencia_laboral.PERSONA_ID= persona.PERSONA_ID " + 
    " union select count(distinct persona.Persona_ID) from persona right join"+ 
    " experiencia_laboral on experiencia_laboral.PERSONA_ID= persona.PERSONA_ID"+ 
    " join formacion on formacion.PERSONA_ID = persona.PERSONA_ID"+ 
    " join 	programa_academico on programa_academico.PROGRAMA_ID"+
    " = formacion.PROGRAMA_ID join tipo on tipo.TIPO_ID = programa_academico.TIPO_ID"+
    " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID"+
    " where extract(year from formacion.FORMACION_FINGRESO) = "+parametro1+" and facultad.FACULTAD_ID=1;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaCuatro', (req, res) => {
    var parametro1 = req.query.year;
    ds.connector.query("select    count( distinct persona.Persona_ID) as Cantidad, "+
        " tipo_contrato.TIPOCONTRATO_DESC as Tipo from  persona  "+
        " join experiencia_laboral on experiencia_laboral.PERSONA_ID= persona.PERSONA_ID "+
        " join tipo_contrato on tipo_contrato.TIPOCONTRATO_ID  = experiencia_laboral.TIPOCONTRATO_ID "+
        "join formacion on formacion.PERSONA_ID = persona.PERSONA_ID "+
        " join 	programa_academico on programa_academico.PROGRAMA_ID "+
        "= formacion.PROGRAMA_ID"+
        " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID"+
        " where extract(year from formacion.FORMACION_FINGRESO) = "+parametro1+" and facultad.FACULTAD_ID=1" +
         " group by tipo_contrato.TIPOCONTRATO_DESC;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaCinco', (req, res) => {
    var parametro1 = req.query.year;
    ds.connector.query(" select count(distinct persona.Persona_ID) AS Cantidad from persona "+
         " left join experiencia_laboral on experiencia_laboral.PERSONA_ID= persona.PERSONA_ID "+
         " join formacion  on persona.PERSONA_ID= formacion.PERSONA_ID "+
         " join 	programa_academico on programa_academico.PROGRAMA_ID "+
         " = formacion.PROGRAMA_ID"+
         " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID"+
         " where extract(year from formacion.FORMACION_FINGRESO) = "+ parametro1 +"   and facultad.FACULTAD_ID=1"+
         " union select count(distinct persona.Persona_ID) AS Cantidad from persona right join "+
         " experiencia_laboral on experiencia_laboral.PERSONA_ID= persona.PERSONA_ID "+
         " join formacion  on persona.PERSONA_ID= formacion.PERSONA_ID "+
         " join 	programa_academico on programa_academico.PROGRAMA_ID "+
         "= formacion.PROGRAMA_ID " +
         " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID"+
         " where experiencia_laboral.AREA_ID <>12 and extract(year from formacion.FORMACION_FINGRESO) ="+ parametro1 +" "+
         " AND facultad.FACULTAD_ID=1;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaSeis', (req, res) => {
    ds.connector.query("select count(*) as Cantidad from persona join formacion on "+
    " persona.PERSONA_ID= formacion.PERSONA_ID join programa_academico on programa_academico.PROGRAMA_ID = formacion.PROGRAMA_ID "+
    " join facultad on programa_academico.FACULTAD_ID= facultad.FACULTAD_ID ;", null, (err, obj) => {
      if(err) return res.json(err);
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });
  router.get('/vistaSiete', (req, res) => {
    ds.connector.query(" call usp_egresados_porcentaje(); ", null, function(err, obj) {
      if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj[0]);
    });
  });


   router.get('/vistaOcho', (req, res) => {
         var parametro1 = req.query.year;

    ds.connector.query("  select count(distinct persona.PERSONA_ID) as Cantidad, extract(year from formacion.FORMACION_FEGRESO) as Egreso  from persona join formacion on "+
        " persona.PERSONA_ID= formacion.PERSONA_ID join 	programa_academico on programa_academico.PROGRAMA_ID "+
        " = formacion.PROGRAMA_ID join tipo on tipo.TIPO_ID = programa_academico.TIPO_ID"+
        " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID"+
        " where extract(year from formacion.FORMACION_FINGRESO) = "+ parametro1 +" "+
        " and facultad.FACULTAD_ID=1"+
        " group by extract(year from formacion.FORMACION_FEGRESO) ;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });


  router.get('/vistaNueve', (req, res) => {
         var parametro1 = req.query.year;

          ds.connector.query("  select count(distinct persona.PERSONA_ID) as Cantidad, extract(year from formacion.FORMACION_FEGRESO) "+
          " - extract(year from formacion.FORMACION_FINGRESO) AS Tiempo from persona join formacion on "+
          "persona.PERSONA_ID= formacion.PERSONA_ID join 	programa_academico on programa_academico.PROGRAMA_ID "+
          " = formacion.PROGRAMA_ID join tipo on tipo.TIPO_ID = programa_academico.TIPO_ID" +
          " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID "+
          " where extract(year from formacion.FORMACION_FINGRESO) ="+ parametro1 +" "+
          " and facultad.FACULTAD_ID=1 "+
          " group by extract(year from formacion.FORMACION_FEGRESO) " +
          " - extract(year from formacion.FORMACION_FINGRESO) ;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaDiez', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query("  select count(distinct persona.PERSONA_ID) as Cantidad, extract(year from formacion.FORMACION_FINGRESO)"+ 
            " as Ingreso from persona join formacion on"+ 
            " persona.PERSONA_ID= formacion.PERSONA_ID join 	programa_academico on programa_academico.PROGRAMA_ID"+
            " = formacion.PROGRAMA_ID join tipo on tipo.TIPO_ID = programa_academico.TIPO_ID"+
            " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID WHERE"+
            " facultad.FACULTAD_ID=20"+
            " group by extract(year from formacion.FORMACION_FINGRESO) ;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaOnce', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query(" select  CONCAT(persona.PERSONA_APATERNO, ' ',persona.PERSONA_AMATERNO) as 'Apellidos',"+
          " persona.PERSONA_NOMBRES as 'Nombre', extract(year from formacion.FORMACION_FINGRESO) as "+
          " 'Ingreso' ,extract(year from formacion.FORMACION_FINGRESO) as 'Egreso' "+
	        " from persona join formacion on"+ 
	        " persona.PERSONA_ID= formacion.PERSONA_ID join 	programa_academico on programa_academico.PROGRAMA_ID"+
          "	= formacion.PROGRAMA_ID join tipo on tipo.TIPO_ID = programa_academico.TIPO_ID"+
	        " join facultad on facultad.FACULTAD_ID= programa_academico.FACULTAD_ID"+
	        " where  facultad.FACULTAD_ID=1;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaDoce', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query("select count( DISTINCT f.PERSONA_ID) as 'Cantidad',extract(YEAR FROM f.FORMACION_FINGRESO) as 'INGRESO', fa.FACULTAD_DESC_MIN as 'FACULTAD'"+
          " from formacion f join persona p ON"+
          " p.PERSONA_ID = f.PERSONA_ID join programa_academico pa ON"+
          " pa.PROGRAMA_ID = f.PROGRAMA_ID join facultad fa ON"+
          " fa.FACULTAD_ID = pa.FACULTAD_ID"+
          " where fa.FACULTAD_ID = 1" +
          " group by extract(YEAR FROM f.FORMACION_FINGRESO);", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaTrece', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query("SELECT count(f.PERSONA_ID) as 'Cantidad', extract(YEAR FROM f.FORMACION_FEXPED_GRADO) as 'EXPEDICION DE GRADO', fa.FACULTAD_DESC_MIN as 'FACULTAD'"+
          " from formacion f join persona p ON"+
          " p.PERSONA_ID = f.PERSONA_ID join programa_academico pa ON"+
          " pa.PROGRAMA_ID = f.PROGRAMA_ID join facultad fa ON"+
          " fa.FACULTAD_ID = pa.FACULTAD_ID"+
          " where fa.FACULTAD_ID = 1"+
          " group by extract(YEAR FROM f.FORMACION_FEXPED_GRADO), fa.FACULTAD_DESC_MIN ;", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });


  router.get('/vistaCatorce', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query(" SELECT count(f.PERSONA_ID) as 'NUMERO DE PERSONAS', extract(YEAR FROM f.FORMACION_FEGRESO) as 'EGRESO', fa.FACULTAD_DESC_MIN as 'FACULTAD'"+
            " from formacion f join persona p ON"+
            " p.PERSONA_ID = f.PERSONA_ID join programa_academico pa ON"+
            " pa.PROGRAMA_ID = f.PROGRAMA_ID join facultad fa ON"+
            " fa.FACULTAD_ID = pa.FACULTAD_ID"+
            " where fa.FACULTAD_ID = 1"+
            " group by extract(YEAR FROM f.FORMACION_FEGRESO), fa.FACULTAD_DESC_MIN; ", null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  router.get('/vistaQuince', (req, res) => {
         var parametro1 = req.query.year;
          ds.connector.query(" SELECT count(f.PERSONA_ID) as 'Cantidad', extract(YEAR FROM f.FORMACION_FEGRESO) as 'EGRESO', fa.FACULTAD_DESC_MIN as 'FACULTAD'"+
          " from formacion f join persona p ON"+
          " p.PERSONA_ID = f.PERSONA_ID join programa_academico pa ON"+
          " pa.PROGRAMA_ID = f.PROGRAMA_ID join facultad fa ON"+
          " fa.FACULTAD_ID = pa.FACULTAD_ID"+
          " where fa.FACULTAD_ID = 1 and  extract(YEAR FROM f.FORMACION_FINGRESO)= "+parametro1+ " group by extract(YEAR FROM f.FORMACION_FEGRESO), fa.FACULTAD_DESC_MIN; ",
           null, function(err, obj) {
              if(err) return res.json(err); 
      else return res.set({
        'Content-Type': 'application/json'
      }).jsonp(obj);
    });
  });

  server.use(router);
};
