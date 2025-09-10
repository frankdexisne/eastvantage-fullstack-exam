<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseCrudController extends Controller
{
    protected $modelQuery;

    protected $model;

    protected string $storeRequest;

    protected string $updateRequest;

    protected $service;


    public function index(Request $request) {
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 10;
        return $this->service->paginated($this->modelQuery, $pageSize);
    }

    public function store(){
        $request = app($this->storeRequest);

        return $this->service->create($request->validated());
    }

    public function update($id) {
        
        $data = $this->service->find($id);

        if (!$data) return response("Record not found", 404);

        $request = app($this->updateRequest);

        return $this->service->update($id, $request->validated());

        return response(null, 204);
    }

    public function show($id) {

        $data = $this->service->find($id);

        if (!$data) return response("Record not found", 404);

        return $this->service->find($id);
    }

    public function destroy($id) {
        $data = $this->service->find($id);

        if (!$data) return response("Record not found", 404);

        $this->service->delete($id);

        return response(null, 204);
    }
}
