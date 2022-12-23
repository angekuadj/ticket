<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // DB::table('classes')->insert([
        //     'nom'=>'IDA1'
        // ]);

        DB::table('filieres')->insert([
            'nom'=>'IDA'
        ]);

        // DB::table('procedures')->insert([
        //     'nom'=>'Attente'
        // ]);

        // DB::table('procedures')->insert([
        //     'nom'=>'Echec'
        // ]);

        // DB::table('procedures')->insert([
        //     'nom'=>'Valider'
        // ]);

    }
}
