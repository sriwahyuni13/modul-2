'gunakan ketat' ;

const  config  =  memerlukan ( './webpack.config.js' ) ;
const  webpack  =  membutuhkan ( 'webpack' ) ;

const  compiler  =  webpack ( config ) ;

konsol . log ( 'Memulai pembuatan browser...' ) ;
penyusun . jalankan ( ( err ,  statistik )  =>  {
  jika  ( salah )  
  {
    konsol . err ( statistik . toString ( ) ) ;
    konsol . err ( 'Build browser gagal.' ) ;
    proses . keluar ( 1 ) ;
  }
  konsol . log ( stats . toString ( ) ) ;
  konsol . log ( 'Pembuatan peramban berhasil.' ) ;
  proses . keluar ( 0 ) ;
} ) ;