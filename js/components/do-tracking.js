Vue.component('do-tracking', {

data(){

return{

keyword:'',

tracking:[],

paket:[],

pengirimanList:[],

formDO:{

nim:'',

nama:'',

ekspedisi:'',

paket:''

},

progress:''

}

},

mounted(){

fetch('js/dataBahanAjar.json')

.then(res=>res.json())

.then(data=>{

this.tracking=data.tracking||[]

this.paket=data.paket||[]

this.pengirimanList=data.pengirimanList||[]

})

},

computed:{

hasilCari(){

if(this.keyword===''){

return this.tracking

}

return this.tracking.filter(item=>{

const nomor=

Object.keys(item)[0]

const data=

item[nomor]

return(

nomor

.toLowerCase()

.includes(

this.keyword.toLowerCase()

)

||

data.nim

.includes(

this.keyword

)

)

})

},

paketTerpilih(){

return this.paket.find(

p=>

p.kode===

this.formDO.paket

)

}

},

methods:{

resetCari(){

this.keyword=''

},

generateDO(){

const tahun=

new Date()

.getFullYear()

const nomor=

String(

this.tracking.length+1

)

.padStart(

3,

'0'

)

return `DO${tahun}-${nomor}`

},

tambahDO(){

if(

this.formDO.nim===''

||

this.formDO.nama===''

||

this.formDO.ekspedisi===''

||

this.formDO.paket===''

){

alert(

'Lengkapi semua data'

)

return

}

const nomor=

this.generateDO()

this.tracking.push({

[nomor]:{

nim:

this.formDO.nim,

nama:

this.formDO.nama,

status:

'Diproses',

ekspedisi:

this.formDO.ekspedisi,

tanggalKirim:

new Date()

.toLocaleDateString(

'id-ID'

),

paket:

this.formDO.paket,

total:

this.paketTerpilih.harga,

perjalanan:[

{

waktu:

new Date()

.toLocaleString(

'id-ID'

),

keterangan:

'Delivery Order dibuat'

}

]

}

})

alert(

'DO berhasil ditambahkan'

)

this.formDO={

nim:'',

nama:'',

ekspedisi:'',

paket:''

}

},

tambahProgress(data){

if(

this.progress===''

){

alert(

'Isi progress'

)

return

}

data.perjalanan.push({

waktu:

new Date()

.toLocaleString(

'id-ID'

),

keterangan:

this.progress

})

this.progress=''

}

},

template:`

<div>

<h2>

Tracking Delivery Order

</h2>

<input

v-model="keyword"

placeholder="Cari Nomor DO / NIM"

@keyup.enter="keyword=keyword.trim()"

@keyup.esc="resetCari()"

>

<button @click="resetCari">

Reset

</button>

<hr>

<h3>

Tambah Delivery Order

</h3>

<input
v-model="formDO.nim"
placeholder="NIM">

<input
v-model="formDO.nama"
placeholder="Nama">

<select
v-model="formDO.ekspedisi">

<option value="">

Pilih Ekspedisi

</option>

<option
v-for="e in pengirimanList"
:value="e.nama">

{{ e.nama }}

</option>

</select>

<select
v-model="formDO.paket">

<option value="">

Pilih Paket

</option>

<option
v-for="p in paket"
:value="p.kode">

{{ p.kode }} - {{ p.nama }}

</option>

</select>

<div
v-if="paketTerpilih">

<p>

Isi Paket:

</p>

<ul>

<li
v-for="isi in paketTerpilih.isi">

{{ isi }}

</li>

</ul>

<p>

Total:

Rp {{ paketTerpilih.harga.toLocaleString('id-ID') }}

</p>

</div>

<button
@click="tambahDO">

Tambah DO

</button>

<hr>

<div
v-for="item in hasilCari">

<div
v-for="(data,nomor) in item">

<h3>

{{ nomor }}

</h3>

<p>NIM: {{ data.nim }}</p>

<p>Nama: {{ data.nama }}</p>

<p>Status: {{ data.status }}</p>

<p>Ekspedisi: {{ data.ekspedisi }}</p>

<p>Tanggal: {{ data.tanggalKirim }}</p>

<p>Paket: {{ data.paket }}</p>

<p>

Total:

Rp {{ data.total.toLocaleString('id-ID') }}

</p>

<ul>

<li
v-for="jalan in data.perjalanan">

{{ jalan.waktu }}

-

{{ jalan.keterangan }}

</li>

</ul>

<input
v-model="progress"
placeholder="Tambah progress">

<button
@click="tambahProgress(data)">

Tambah Progress

</button>

<hr>

</div>

</div>

</div>

`

})