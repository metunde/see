<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Host;
use Illuminate\Auth\Access\Response;

class HostPolicy
{
   

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function modify(User $user, Host $host): Response
    {
     return $user->id === $host->user_id
     ?Response::allow()
      :Response::deny('you do not have access to modify this record');
    }
}