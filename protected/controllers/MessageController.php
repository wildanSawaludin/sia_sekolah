<?php

class MessageController extends MyController
{
	public function actionIndex($bulan=null,$tahun=null,$status="Polisi")
	{
                if($tahun==null){
                    $tahun=date('Y');
                }
                if($bulan==null){
                    $bulan=date('m')*1-1;
                    if($bulan==12){
                        $tahun--;
                    }
                }
                $data['jumlahHariAktif']= HariAktif::model()->getHariAktif($bulan,$tahun);
		$data['pegawaiList']=  Pegawai::model()->getPegawaiList($status);
                $data['bulan']=$bulan;
                $data['tahun']=$tahun;
                $data['status']=$status;
                
                $this->render('index',$data);
	}
        public function actionKirimPesan($bulan,$tahun,$status='polisi'){
                $jumlahHariAktif= HariAktif::model()->getHariAktif($bulan,$tahun);
                
		$pegawaiList=  Pegawai::model()->getPegawaiList($status);
                $data['bulan']=$bulan;
                $data['tahun']=$tahun;
                
                if($jumlahHariAktif==0){
                    $this->render('pesanHariAktifMasihKosong',$data);
                }else{
                    Yii::app()->db->createCommand()->insert('pesan', array('status'=>'reminder'));
                    $pesan= Yii::app()->db->createCommand("select max(id) as id from pesan")->queryRow();
//                    $this->show_array($pegawaiList);exit;
                    foreach($pegawaiList as $pegawai){
                        $smsReminder=Pegawai::model()->getSmsReminder($pegawai['status'],$pegawai['id'],$bulan,$tahun,$jumlahHariAktif);
//                        echo $smsReminder.'<hr>';
                        $id_send_item=  Common::model()->sendMessage($pegawai['no_hp'],$smsReminder);
//                        $this->show_array($id_send_item);
//                                                continue;
                        foreach($id_send_item as $id_sent){
                            Yii::app()->db->createCommand()->insert('pesan_pegawai', array(
                                'id_pegawai'=>$pegawai['id_pegawai'],
                                'id_pesan'=>$pesan['id'],
                                'id_send_item'=>$id_sent,
                            ));
                        }
                    }
//                    exit;
                    $this->redirect(Yii::app()->createUrl('message/viewDetail',array('id_pesan'=>$pesan['id'])));
                }
                
        }
        public function actionViewDetail($id_pesan){
            $data['pesan']= Yii::app()->db->createCommand("select date(pesan.waktu) as tanggal,time(pesan.waktu) as jam,
                pesan.* from pesan where id='$id_pesan'")->queryRow();
            $data['pesanPegawai']= Pesan::model()->getPesanDetail($id_pesan);
            $this->render('viewDetail',$data);
        }
        public function actionStart(){
            exec("gammu-smsd -c smsdrc1 -n phone1 -i",$hasil1); //install service
            sleep(2);
            exec("gammu-smsd -c smsdrc1 -n phone1 -s",$hasil2); // start service
            $data['pesan']=$hasil1[0].'<br>'.$hasil2[0];
            $this->render('smsGateway',$data);
        }
        public function actionInstall(){
            exec("gammu-smsd -c smsdrc1 -n phone1 -i",$hasil); //install service
            echo "$hasil[0]";
        }
        public function actionService(){
            exec("gammu-smsd -c smsdrc1 -n phone1 -s",$hasil); // start service
            echo "$hasil[0]";
        }
        public function actionStop(){
             exec("gammu-smsd -n phone1 -k", $hasil1); //stop phone service
             exec("gammu-smsd -n phone1 -u", $hasil2); // service uninstal phone1
             $data['pesan']=$hasil1[0].'<br>'.$hasil2[0];
             $this->render('smsGateway',$data);
        }
        public function actionSmsGateway(){
            $this->render('smsGateway');
        }
        public function actionResend(){
            $is_success=Pesan::model()->resend($_GET['id_send_item']);
            $this->notice($is_success, '', null,'Kirim ulang pesan');
            $this->actionViewDetail($_GET['id_pesan']);
        }
        public function actionTest($nomorHp='',$text=''){
//            if($nomorHp==null || $nomorHp==''){
//                return null;
//            }
            $nomorHp='085726457243';
            $text='Slmt Fendi Tri Cahyono, Bln ini anda mendapatkan Rp. 615.600, utk uang makan PNS, dan Rp. 0 utk uang lembur sisa cuti yang bisa diguna';
            $jumlahSms=  floor(strlen($text)/155);
            if(strlen($text)%155!=0){
                $jumlahSms++;
            }
            echo "jumlah sms $jumlahSms <br>";
            $idList=array();
            for($i=1;$i<=$jumlahSms;$i++){
                exec('gammu-smsd-inject -c smsdrc1 TEXT '.$nomorHp.' -text "'.  substr($text,155*($i-1),155).'"',$hasil[$i]);
                sleep(1);
                echo substr($text,155*($i-1),155).' jumlah karakter= '.count(substr($text,155*($i-1),155)).'<br>';
//                $id=explode("ID ", $hasil[$i][4]);
                $idList[]=$id[1];
                
            }
            
    //        echo "-$id[1]-";
//            return 1;
            return $idList;
        }
}