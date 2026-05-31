Vue.component('stock-table', {

data(){

return{

filterUpbjj:'',
sortBy:'',

upbjjList:[],

stok:[],

formBaru:{
kode:'',
judul:'',
kategori:'',
upbjj:'',
lokasiRak:'',
qty:0,
harga:0,
safety:0
},

editIndex:null

}

},

mounted(){

fetch(
'js/dataBahanAjar.json'
)

.then(
res=>res.json()
)

.then(data=>{

this.upbjjList=
data.upbjjList

this.stok=
data.stok

})

},

computed:{

filteredStok(){

let hasil=[...this.stok]

if(
this.filterUpbjj!==''
){

hasil=
hasil.filter(
item=>
item.upbjj===this.filterUpbjj
)

}

if(
this.sortBy==='judul'
){

hasil.sort(
(a,b)=>
a.judul.localeCompare(
b.judul
)
)

}

if(
this.sortBy==='qty'
){

hasil.sort(
(a,b)=>
b.qty-a.qty
)

}

return hasil

}

},

watch:{

filterUpbjj(){

console.log(
'Filter berubah'
)

},

stok:{

handler(){

console.log(
'Data stok diperbarui'
)

},

deep:true

}

},

methods:{

hapusData(index){

if(
confirm(
'Yakin ingin menghapus data?'
)
){

this.stok.splice(
index,
1
)

}

},

editData(index){

this.editIndex=index

this.formBaru={

...this.stok[index]

}

},

tambahData(){

if(

this.formBaru.kode===''

||

this.formBaru.judul===''

){

alert(
'Kode dan Judul wajib diisi'
)

return

}

const data={

...this.formBaru,

qty:Number(
this.formBaru.qty
),

harga:Number(
this.formBaru.harga
),

safety:Number(
this.formBaru.safety
)

}

if(
this.editIndex!==null
){

this.stok.splice(
this.editIndex,
1,
data
)

alert(
'Data berhasil diupdate'
)

this.editIndex=null

}

else{

this.stok.push(
data
)

alert(
'Data berhasil ditambah'
)

}

this.formBaru={

kode:'',
judul:'',
kategori:'',
upbjj:'',
lokasiRak:'',
qty:0,
harga:0,
safety:0

}

}

},

template:`

<div>

<h2>Daftar Stok Bahan Ajar</h2>

<div class="filter-group">

<label>

Filter UPBJJ

</label>

<select
v-model="filterUpbjj">

<option value="">
Semua
</option>

<option
v-for="upbjj in upbjjList"
:value="upbjj">

{{ upbjj }}

</option>

</select>

<label>

Urutkan

</label>

<select
v-model="sortBy">

<option value="">
Default
</option>

<option value="judul">
Judul A-Z
</option>

<option value="qty">
Qty Terbesar
</option>

</select>

</div>


<h3>Tambah Data</h3>

<div class="form-tambah">

<input
v-model="formBaru.kode"
placeholder="Kode">

<input
v-model="formBaru.judul"
placeholder="Judul">

<input
v-model="formBaru.kategori"
placeholder="Kategori">

<input
v-model="formBaru.upbjj"
placeholder="UPBJJ">

<input
v-model="formBaru.lokasiRak"
placeholder="Lokasi Rak">

<input
type="number"
v-model="formBaru.qty"
placeholder="Qty">

<input
type="number"
v-model="formBaru.harga"
placeholder="Harga">

<input
type="number"
v-model="formBaru.safety"
placeholder="Safety">

<button
@click="tambahData">

{{ editIndex!==null ? 'Update' : 'Tambah' }}

</button>

</div>


<table>

<thead>

<tr>

<th>Kode</th>
<th>Judul</th>
<th>Kategori</th>
<th>UPBJJ</th>
<th>Rak</th>
<th>Qty</th>
<th>Harga</th>
<th>Safety</th>
<th>Status</th>
<th>Aksi</th>

</tr>

</thead>


<tbody>

<tr
v-for="(item,index) in filteredStok">

<td>{{ item.kode }}</td>

<td>{{ item.judul }}</td>

<td>{{ item.kategori }}</td>

<td>{{ item.upbjj }}</td>

<td>{{ item.lokasiRak }}</td>

<td>{{ item.qty }} buah</td>

<td>
Rp {{ item.harga.toLocaleString('id-ID') }}
</td>

<td>
{{ item.safety }} buah
</td>

<td>

<span
v-if="item.qty===0"
class="danger">

Kosong

</span>

<span
v-else-if="item.qty<item.safety"
class="warning">

Menipis

</span>

<span
v-else
class="safe">

Aman

</span>

</td>

<td>

<button
@click="editData(index)">

Edit

</button>

<button
@click="hapusData(index)">

Hapus

</button>

</td>

</tr>

</tbody>

</table>

</div>

`

})