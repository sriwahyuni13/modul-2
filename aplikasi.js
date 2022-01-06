/*!
 * cepat
 * Hak Cipta (c) 2009-2013 TJ Holowaychuk
 * Hak Cipta (c) 2013 Roman Shtylman
 * Hak Cipta (c) 2014-2015 Douglas Christopher Wilson
 * Berlisensi MIT
 */

'gunakan ketat' ;

/**
 * Ketergantungan modul.
* @pribadi
 */

var  finalhandler  =  membutuhkan ( 'finalhandler' ) ;
var  Router  =  membutuhkan ( './router' ) ;
var  metode  =  memerlukan ( 'metode' ) ;
var  middleware  =  membutuhkan ( './middleware/init' ) ;
var  query  =  membutuhkan ( './middleware/query' ) ;
var  debug  =  memerlukan ( 'debug' ) ( 'express:aplikasi' ) ;
var  Tampilan  =  memerlukan ( './view' ) ;
var  http  =  membutuhkan ( 'http' ) ;
var  compileETag  =  membutuhkan ( './utils' ) . kompilasiETag ;
var  compileQueryParser  =  membutuhkan ( './utils' ) . compileQueryParser ;
var  compileTrust  =  membutuhkan ( './utils' ) . kompilasiTrust ;
var  deprecate  =  membutuhkan ( 'depd' ) ( 'express' ) ;
var  flatten  =  membutuhkan ( 'array-flatten' ) ;
var  merge  =  membutuhkan ( 'utils-merge' ) ;
var  resolve  =  membutuhkan ( 'jalan' ) . menyelesaikan ;
var  setPrototypeOf  =  membutuhkan ( 'setprototypeof' )
var  irisan  =  Array . prototipe . irisan ;

/**
 * Prototipe aplikasi.
 */

var  aplikasi  =  ekspor  =  modul . ekspor  =  { } ;

/**
 * Variabel untuk back-compat warisan proxy kepercayaan
* @pribadi
 */

var  trustProxyDefaultSymbol  =  '@@symbol:trust_proxy_default' ;

/**
 * Inisialisasi server.
 *
 * - atur konfigurasi default
 * - atur middleware default
 * - atur metode refleksi rute
 *
* @pribadi
 */

aplikasi . init  =  fungsi   ( )  
{
  ini . cache  =  { } ;
  ini . mesin  =  { } ;
  ini . pengaturan  =  { } ;

  ini . defaultKonfigurasi ( ) ;
} ;

/**
 * Inisialisasi konfigurasi aplikasi.
* @pribadi
 */

aplikasi . defaultConfiguration  =  fungsi    ( )  
{
  var  env  =  proses . env . NODE_ENV  ||  'pembangunan' ;

  // pengaturan default
  ini . aktifkan ( 'x-powered-by' ) ;
  ini . set ( 'etag' ,  'lemah' ) ;
  ini . set ( 'env' ,  env ) ;
  ini . set ( 'pengurai kueri' ,  'diperpanjang' ) ;
  ini . set ( 'subdomain offset' ,  2 ) ;
  ini . set ( 'proxy kepercayaan' ,  salah ) ;

  // trust proxy mewarisi back-compat
  Objek . defineProperty ( pengaturan . ini , trustProxyDefaultSymbol , {  
    dapat   : benar ,
    nilai : benar
  } ) ;

  debug ( 'boot dalam mode %s' ,  env ) ;

  ini . pada ( 'mount' ,  fungsi    ( parent )  
   
    // mewarisi proxy kepercayaan
       ( ini . pengaturan [ trustProxyDefaultSymbol ]  ===  benar
      &&  tipe    . pengaturan [ 'trust proxy fn' ]  ===  'fungsi' )   
        . pengaturan [ 'proxy kepercayaan' ]  
           . pengaturan [ 'kepercayaan proxy fn' ] 
     

    // mewarisi protos
     ( permintaan . ini , induk . permintaan ) 
     ( ini . respon ,  induk . respon )
      ( this . engine ,  parent . engine )
     ( ini . pengaturan ,  orang  . pengaturan )
     

  // atur lokal
    . penduduk    =  Obyek . buat ( null ) 

  // aplikasi paling atas dipasang di /
    . jalur    =  '/' 

  // default lokal
   . penduduk   . pengaturan  =  ini . pengaturan  

  // konfigurasi default
  . set ( 'tampilan' ,  Lihat ) 
   . set ( 'views' ,  resolve ( 'views' ) )  
    . set ( 'nama panggilan balik jsonp' ,  'panggilan balik' ) 

    ( env  ===  'produksi' )  
     
        (  )  
   

       ( ini ,  'router' ,  {
    dapatkan : fungsi ( )  
         
    }
  
  

/**
 * malas menambahkan router dasar jika belum ditambahkan.
 *
 * Kami tidak dapat menambahkan router dasar di Konfigurasi default karena
 * membaca pengaturan aplikasi yang mungkin diatur setelah itu berjalan.
 *
* @pribadi
 */
 . lazyrouter  =  fungsi    ( )   
    ( ! ini . _router )   
      . _router  =  Router   ( {
      caseSensitive : ini . diaktifkan ( 'perutean peka huruf besar-kecil' ) ,
      ketat : ini . diaktifkan ( 'perutean ketat' )
    } )  

      . _   . gunakan ( query ( this . get ( 'query parser fn' ) ) ) )  
      . _   . gunakan ( middleware . init ( ini ) ) 
   
  

/**
* Kirim permintaan, pasangkan res ke dalam aplikasi. Memulai pemrosesan pipa.
 *
 * Jika tidak ada panggilan balik yang diberikan, maka penangan kesalahan default akan merespons
 * jika terjadi kesalahan yang menggelegak melalui tumpukan.
 *
* @pribadi
 */

  . handle  =  fungsi    ( req ,  res ,  callback )   
       =  ini . _  
  // pengendali terakhir
       =  panggilan  ||  finalhandler ( req ,  res ,  {
    env : ini . dapatkan ( 'env' ) ,
    onerror : log    ( ini )
  } )  

  // tidak ada rute
     ( ! router )   
     (  )  
     ( )  
    

   . menangani ( req ,  res ,  selesai )  
  

/**
 * Proxy `Router#use()` untuk menambahkan middleware ke router aplikasi.
 * Lihat dokumentasi Router#use() untuk detailnya.
 *
 * Jika parameter _fn_ adalah aplikasi ekspres, maka itu akan menjadi
 * dipasang pada _route_ yang ditentukan.
 *
* @publik
 */

  . gunakan          ( fn ) 
 
          
          

  // jalur default ke '/'
  // disambiguasi app.use([fn])
     ( typeof  fn  !==  'fungsi' )   
             

       ( Array . isArray ( arg )  &&  arg . length  !==  0 ) 
              [ 0 ] 
     

    // argumen pertama adalah jalurnya
      ( typeof  arg  !==  'fungsi' )  
             
             
   
   

             ( slice . call ( argumen ,  offset ) )  

     ( fns . panjang  ===  0 )  
                
         (   )
  

  // mengatur perute
    . ma     . _    

    . untukSetiap ( fungsi  ( fn )  
    // aplikasi non-ekspres
      (    set )   
        . gunakan ( jalur ,  fn )  
     

      ( '.gunakan aplikasi di bawah %s' ,  jalur ) 
     . jalur    =  jalur  
      . induk  =  ini  

    // pulihkan properti .app di req dan res
      . gunakan ( path ,  function  mounted_app ( req ,  res ,  next )  {
      var  asal  =  req . aplikasi ;
      fn . menangani ( req ,  res ,  fungsi  ( err )  
          ( req ,  orig    )
          ( res ,  orig . response )
          ( salah ) 
       ) ;
    } )  

    // memasang aplikasi
    . memancarkan ( 'mount' ,  ini ) 
     

  
   

/**
 * Proksi ke aplikasi `Router#route()`
 * Mengembalikan instance `Rute` baru untuk _path_.
 *
 * Rute adalah tumpukan middleware yang terisolasi untuk jalur tertentu.
 * Lihat dokumen api Route untuk detailnya.
 *
* @publik
 */

 . rute  =  fungsi  ( jalur )   
    . malasrouter ( ) 
   . _  . rute ( jalur ) 
  

/**
 * Daftarkan panggilan balik mesin templat yang diberikan `fn`
 * sebagai `ekst`.
 *
 * Secara default akan `memerlukan()` mesin berdasarkan
* ekstensi file. Misalnya jika Anda mencoba merender
 * file "foo.ejs" Express akan memanggil berikut ini secara internal:
 *
 * app.engine('ejs', membutuhkan('ejs').__express);
 *
 * Untuk mesin yang tidak menyediakan `.__express` di luar kotak,
 * atau jika Anda ingin "memetakan" ekstensi yang berbeda ke mesin template
* Anda dapat menggunakan metode ini. Misalnya memetakan mesin template EJS ke
 * File ".html":
 *
 * app.engine('html', membutuhkan('ejs').renderFile);
 *
 * Dalam hal ini EJS menyediakan metode `.renderFile()` dengan
 * tanda tangan yang sama yang diharapkan Express: `(path, options, callback)`,
 * meskipun perhatikan bahwa metode ini alias metode ini sebagai `ejs.__express` secara internal
 * jadi jika Anda menggunakan ekstensi ".ejs", Anda tidak perlu melakukan apa pun.
 *
 * Beberapa mesin template tidak mengikuti konvensi ini,
 * [Consolidate.js](https://github.com/tj/consolidate.js)
 * perpustakaan dibuat untuk memetakan semua templat populer simpul
 * mesin untuk mengikuti konvensi ini, sehingga memungkinkan mereka untuk
 * bekerja dengan mulus dalam Express.
 *
* @param { String } ext
* @param { Fungsi } fn
* @return { app } untuk chaining
* @publik
 */

  . mesin  =  fungsi    ( ext ,  fn )   
     ( typeof  fn  !==  'fungsi' )  
          (  
   

  // dapatkan ekstensi file
     ekstensi  =  ext [ 0 ]  !==  '.'
    ? '.'  +  ext
    : eks  

  // mesin toko
    . mesin [ ekstensi ]  =  fn 

   
   

/**
* Proksi ke `Router#param()` dengan satu fitur api tambahan. Parameter _name_
 * dapat berupa array nama.
 *
 * Lihat dokumen Router#param() untuk lebih jelasnya.
 *
* @param { String|Array } nama
* @param { Fungsi } fn
* @return { app } untuk chaining
* @publik
 */

  . param  =  fungsi    ( nama ,  fn )  
   . malasrouter ( ) 

    ( Array . isArray ( nama ) )   
       (    i  =  0    <  name . length     ++ )   
       . param ( nama [ i ] ,  fn ) 
 

        
  

     . _    . param ( nama ,  fn )  
      
   

/**
 * Tetapkan `setting` ke `val`, atau kembalikan nilai `setting`.
 *
 * app.set('foo', 'bar');
 * app.set('foo');
 * // => "batang"
 *
 * Server yang dipasang mewarisi pengaturan server induknya.
 *
* @param { String } pengaturan
* @param { * } [val]
* @return { Server } untuk rantai
* @publik
 */

  . set  =  function  set ( pengaturan ,  val )  {
  if  ( argumen . panjang  ===  1 )  {
    // aplikasi.get(pengaturan)
       ini . pengaturan [ pengaturan ] ;
  }

  debug ( 'set "%s" ke %o' ,  setting ,  val ) ;

  // tetapkan nilai
  ini . pengaturan [ pengaturan ]  =  val ;

  // memicu pengaturan yang cocok
  beralih  ( pengaturan ) 
   {
       'etag' 
      ini . set ( 'etag fn' ,  compileETag ( val ) ) ;
      istirahat ;
       'pengurai kueri'  
      ini . set ( 'query parser fn' ,  compileQueryParser ( val ) ) ;
      istirahat ;
      'proxy kepercayaan' 
      ini . set ( 'trust proxy fn' ,  compileTrust ( val ) ) ;

      // trust proxy mewarisi back-compat
      Objek . defineProperty ( pengaturan . ini , trustProxyDefaultSymbol , {  
        dapat   : benar ,
        nilai : salah
      } ) ;

      istirahat ;
  }

    ini ;
}  

/**
 * Kembalikan nama path absolut aplikasi
 *berdasarkan orang tua yang memiliki
 * dipasang.
 *
 * Misalnya jika aplikasi itu
 * dipasang sebagai "/ admin", yang sendiri
 * telah dipasang sebagai "/ blog" lalu
 * nilai kembalian akan menjadi "/ blog/admin".
 *
* @kembali { String }
* @pribadi
 */

  . path  =  fungsi    ( )  
   . induk
    ? ini . orang   . jalur ( )  +  ini . jalur  
  

/**
 * Periksa apakah `pengaturan` diaktifkan (benar).
 *
 * app.enabled('foo')
 * // => salah
 *
 * app.enable('foo')
 * app.enabled('foo')
 * // => benar
 *
* @param { String } pengaturan
* @kembali { Boolean }
* @publik
 */

  . diaktifkan       ( pengaturan )  
     ( set   .  pengaturan )  
   

/**
 * Periksa apakah `pengaturan` dinonaktifkan.
 *
 * app.disabled('foo')
 * // => benar
 *
 * app.enable('foo')
 * app.disabled('foo')
 * // => salah
 *
* @param { String } pengaturan
* @kembali { Boolean }
* @publik
 */

  . dinonaktifkan      ( pengaturan )  
   . mengatur ( pengaturan )  
 

/**
 * Aktifkan `pengaturan`.
 *
* @param { String } pengaturan
* @return { app } untuk chaining
* @publik
 */

  . aktifkan        ( pengaturan ) 
    . set ( pengaturan ,  benar ) 
   

/**
 * Nonaktifkan `pengaturan`.
 *
* @param { String } pengaturan
* @return { app } untuk chaining
* @publik
 */

  . nonaktifkan       ( pengaturan )  
    . set ( pengaturan ,  salah )  
 
/**
 * Delegasikan panggilan `.VERB(...)` ke `router.VERB(...)`.
 */

  . forEach ( fungsi ( metode )  
   [ metode ]  =  fungsi ( jalur )  
       ( method  ===  'get'  &&  argument . length  ===  1 ) 
      // aplikasi.get(pengaturan)
       . set ( jalan )  
   

      . malasrouter ( ) 

  =  ini . _   . rute ( jalur )  
      [ metode ] . apply ( route ,  slice . call ( argumen ,  1 ) )  
     
  

/**
 * Metode "semua" kasus khusus, menerapkan `jalur` rute yang diberikan,
 * middleware, dan panggilan balik ke _setiap_ metode HTTP.
 *
* @param { String } jalur
* @param { Fungsi } ...
* @return { app } untuk chaining
* @publik
 */

  . semua  =  fungsi    ( jalur )   
    . malasrouter ( ) 

       =  ini . _  . rute ( jalur )  
      =  irisan . panggilan ( argumen ,  1 ) 

   (    i  =  0     <  method . length     ++ )  
      [ metode [ i ] ] . terapkan ( rute ,  args ) 
  

     
   

// del -> hapus alias

  . del  =  mencela . function ( app . delete ,  'app.del: Gunakan app.delete sebagai gantinya' )  

/**
 * Render nama `name` tampilan yang diberikan dengan `options`
 * dan panggilan balik menerima kesalahan dan
 * string template yang diberikan.
 *
 * Contoh:
 *
 * app.render('email', { nama: 'Tobi' }, function(err, html){
 * // ...
 * })
 *
* @param { String } nama
* @param { Obyek|Fungsi } opsi atau fn
* @param { Fungsi } panggilan balik
* @publik
 */

  . render  =  fungsi    ( nama ,  opsi ,  panggilan   ) 
         =  ini . tembolok  
     =  panggilan  
       . mesin  
     =  opsi  
       =  { } 
   
  // mendukung fungsi panggilan balik sebagai argumen kedua
   ( opsi    === 'fungsi' )    
      =  pilihan 
     =  { }  
   

  // gabungkan app.locals
    ( renderOptions ,  ini . penduduk   )  

  // menggabungkan opsi._locals
     ( memilih . _locals ) 
     ( renderOptions ,  opts . _locals ) 
   

  // menggabungkan opsi
    ( renderOptions ,  opts )  

  // set .cache kecuali disediakan secara eksplisit
     ( renderOptions . cache  ==  null )   
          =  ini . diaktifkan ( 'lihat cache' )  
   

  // cache prima
    ( renderOptions . cache )   
       =  cache [ nama ]  
   

  // melihat
     ( ! lihat )   
          =  ini . dapatkan ( 'tampilan' )  

       =  Tampilan    ( nama , { 
      mesin   : ini . dapatkan ( 'lihat mesin' ) ,
      akar : ini . dapatkan ( 'tampilan' ) ,
      mesin : mesin
    } )  
      ( ! lihat . jalur )   
          =  Array . isArray ( lihat . root )  &&  lihat . akar . panjang  >  1
        ? 'direktori "'  +  view . root . slice ( 0 ,  - 1 ) . gabung ( '", "' )  +  '" atau "'  +  view . root [ view . root . length  -  1 ]  +  '"'
        : 'direktori "'  +  lihat . root  +  '"'
                  ( 'Gagal mencari tampilan "'  +  nama  +  '" dalam tampilan '  +  dirs )  
       . melihat      
           ( err )  
    

    // utamakan cache
    ( renderOptions . cache )   
        [ nama ]      
     
   

  // render
    ( lihat ,  renderOptions ,  selesai )  
   

/**
 * Dengarkan koneksi.
 *
 * Sebuah node `http.Server` dikembalikan, dengan ini
 * aplikasi (yang merupakan `Fungsi`) sebagai
* panggilan balik. Jika Anda ingin membuat keduanya HTTP
 * dan server HTTPS Anda dapat melakukannya dengan "http"
 * dan modul "https" seperti yang ditunjukkan di sini:
 *
 * var http = membutuhkan('http')
 * , https = membutuhkan('https')
 * , ekspres = membutuhkan('ekspres')
 * , aplikasi = ekspres();
 *
 * http.createServer(app).listen(80);
 * https.createServer({ ... }, app).listen(443);
 *
* @ Return { http.Server }
* @publik
 */

  . mendengarkan     ( )   
          . createServer ( ini )  
       . mendengarkan . berlaku ( server ,  argumen ) 
   

/**
 * Kesalahan log menggunakan console.error.
 *
* @param { Kesalahan } err
* @pribadi
 */

  ( err ) 
  /* istanbul abaikan selanjutnya */
     ( this . get ( 'env' )  !==  'test' )   . kesalahan ( err . stack  ||  err . toString ( ) ) 

/**
 * Coba render tampilan.
* @pribadi
 */

    ( view ,  options ,  callback ) 
    
      . render ( opsi ,  panggilan   )  
        ( salah )   
      ( err ) 
 
 