<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Visitor;
use Illuminate\Auth\Access\Response;

class VisitorPolicy
{
   

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function modify(User $user, Visitor $visitor): Response
    {
     return $user->id === $visitor->user_id
     ?Response::allow()
      :Response::deny('you do not have access to modify this record');
    }
}
