<?php
/* @var $this GuruController */
/* @var $model Guru */

$this->breadcrumbs=array(
	'Guru'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List Guru', 'url'=>array('index')),
	array('label'=>'Create Guru', 'url'=>array('create')),
);

?>

<h3>Manage Guru</h3>
<hr>
<div class="row-fluid">
<div class="span5" style="text-align: left">
    <div class="cms-admin-buttons">
        
        <?php $this->widget('bootstrap.widgets.TbButton',array(
                'icon'=>'plus white',
                'label'=>'Tambah Guru',
                'url'=>Yii::app()->createUrl('guru/create'),
                'type'=>'primary',
                'htmlOptions'=>array('target' => 'ajax-modal')
        )); ?>    
            </div>
</div>
<div class="span7" style="text-align: right">
   
    <?php $this->renderPartial('_search_sort',array(
            'model'=>$model,
    )); ?>
        
</div>
</div>

<?php $this->widget('MyCGridView', array(
	'id'=>'guru-grid',
	'dataProvider'=>$model->search(),
	//'filter'=>$model,
	'columns'=>array(
            array(
                    'header' => 'No',
                    'value' => '$row+1',
                    'htmlOptions'=>array('align'=>'center','style'=>'width: 5%')
                ),
		'id_user',
		'nip',
		'nama',
		'alamat',
		'catatan',
		'id_jenjang_pendidikan',
		/*
		'instansi_pendidikan_terakhir',
		'jurusan_pendidikan_terakhir',
		'is_pegawai_tetap',
		'tahunLulus',
		'id_agama',
		*/
		array(
                    'class'=>'MyCButtonColumn',
                    'buttons'=>array(
                        'view'=>array(
                            'options'=>array('target'=>'ajax-modal','title'=>'View')
                        ),
                        'update'=>array(
                            'options'=>array('target'=>'ajax-modal','title'=>'Edit')
                        ),
                        'delete'=>array(
                            'options'=>array('header'=>'Delete Data','target'=>'confirm','message'=>'Apakah anda yakin akan menghapus tahun data ini?',)
                        ),
                    ),
                    'header'=>'Action'
		),
	),
)); ?>


 <?php 
    $this->renderPartial('_search',array(
            'model'=>$model,
    )); 
    ?>    
