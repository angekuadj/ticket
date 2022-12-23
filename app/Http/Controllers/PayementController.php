<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Evenement;
use App\Models\Filiere;
use App\Models\Payement;
use Illuminate\Http\Request;

class PayementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $evv = Evenement::all();
        $cl = Classe::all();
        $fi = Filiere::all();
        $pay = Payement::all();
        $user = auth()->user();
        return view('acheter',compact('evv','cl','fi','user','pay'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $evv = Evenement::all();
        $cl = Classe::all();
        $fi = Filiere::all();
        
        $user = auth()->user();
        return view('acheter',compact('evv','cl','fi','user'));
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id'=>'required',
            'classe_id'=>'required',
            'filiere_id'=>'required',
            'Dnumero'=>'required',
            'is_valide'=>'required',
        ]);

        $pay = new Payement;

        $pay->user_id = $request->input('user_id');
        $pay->classe_id = $request->input('classe_id');
        $pay->filiere_id = $request->input('filiere_id');
        $pay->Dnumero = $request->input('Dnumero');
        $pay->is_valide = $request->input('is_valide');

        $pay->save();
        $evv = Evenement::all();
        $cl = Classe::all();
        $fi = Filiere::all();
        $user = auth()->user();
        return redirect('/acheter',compact('evv','cl','fi','user'))->with('success','Data saved');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
