from django.http import *
from django.http import JsonResponse
from .models import *
import datetime,ast
from .models import Requests,Sans,UserNotifications,AdminNotifications,User,Tickets
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from khayyam import *
from datetime import timedelta
from django.core import serializers
import json


def getUsers(request):

    users = User.objects.all()
    return JsonResponse(list(users.values()),safe=False)

def getUser(request):
    user  = User.objects.filter(pk =1)
    return JsonResponse(list(user.values()), safe=False)



def getUserTickets(requset,userId):

    tickets = Tickets.objects.filter(user_id=userId)
    user = User.objects.get(pk=userId)

    print(list(tickets.values())+[user])
    return JsonResponse(list(tickets.values()).append(user), safe=False)


def getAllTickets(requset):
    tickets = Tickets.objects.all()
    return JsonResponse(list(tickets.values()), safe=False)


def getTicket(request,ticketId):

    ticket = Tickets.objects.get(id=ticketId)
    return JsonResponse(list(ticket.values()), safe=False)


def getAllRequest(request):

    requsets = Requests.objects.all().order_by('-priority','-isPending')
    return JsonResponse(list(requsets.values()), safe=False)


def requestsHandler(request,requestId):
    if request.method=="GET":
        print("GEttttttttttt")
        Request = Requests.objects.get(id=requestId)
        return JsonResponse(list(Request.values()), safe=False)
    if request.method=="POST":
        req = Requests.objects.get(id=requestId)
        seen = request.POST.get('seen',req.seen)
        isPending = request.POST.get('isPending', req.isPending)
        req.seen = seen
        req.isPending =isPending
        req.save()
        return JsonResponse(list(req), safe=False)


def changeUserNotifStatus(request,notifId):

    notif = UserNotifications.objects.get(id=notifId)
    notif.seen = True
    notif.save()
    return JsonResponse({'status':"Saved"})


def changeAdminNotifiStatus(request,notifId):
    notif = AdminNotifications.objects.get(id=notifId)
    notif.seen = True
    notif.save()
    return JsonResponse({'status': "Saved"})


def getUserNotifs(request,userId):
    if request.GET:
        notifs = UserNotifications.objects.filter(ticket__user_id=userId)
        return JsonResponse(list(notifs.values()), safe=False)


def getAdminNotifs(request):
    notifs = AdminNotifications.objects.all().select_related('request')

    return JsonResponse(list(notifs.values()), safe=False)


@csrf_exempt
def addTicket(request):
    if request.POST:
        userId = request.POST['userId']
        desc = request.POST['desc']
        sans, date = setTimeByQueue()
        ticket = Tickets.objects.create(
            user_id=userId,
            desc=desc,
            isPending=True,
            sans=sans,
            date=date
            )
        addUserNotif(userId,ticket)
    ticket = serializers.serialize('json', [ticket, ])

    return JsonResponse(ticket,safe=False)


def addUserNotif(userId,ticket):

    dateTime = datetime.datetime.now().isoformat()
    userNotif = UserNotifications.objects.create(
        user_id=userId,
        ticket= ticket,
        dateTime=dateTime,
        seen=False
    )
    return JsonResponse(userNotif,safe=False)


def setTimeByQueue():
    lastTicket = Tickets.objects.last()
    date1 = lastTicket.date.__str__().split('-')
    date = JalaliDate(date1[0], date1[1], date1[2])
    sanses = list(Sans.objects.order_by('day', 'startTime').all())
    for count in range(len(sanses)):
        if sanses[count].id == lastTicket.sans.id :
            newSans = sanses[count+1]
    delta = date.weekday() - newSans.day
    newDate = date + timedelta(days=delta)
    return newDate.__str__(), newSans


@csrf_exempt
def addRequest(request):

    print(request.method)
    if(request.method=="POST"):
        
        body = jsonParser(request.body.decode('utf-8'))
        userId = body['userId']
        desc = body['desc']
        priority = body['priority']
        seen = False
        isPending = True

        req = Requests.objects.create(user_id=userId,
                                desc=desc,
                                priority=priority,
                                seen=seen,
                                isPending=isPending,
                                )
        addAdminNotif(req,int(userId))
        req = serializers.serialize('json', [ req, ])

        return JsonResponse(req,safe=False)
    if(request.method=="GET"):
        print('geeeeeeeeeetttttt')
        requsets = Requests.objects.all().order_by('-priority','-isPending')
        return JsonResponse(list(requsets.values()), safe=False)


def addAdminNotif(request,userId):

    AdminNotifications.objects.create(
        user_id=userId,
        request=request,
        seen=False,
    )
    return 0


def jsonParser(string):
    s = string.replace("{" ,"")
    finalstring = s.replace("}" , "")

    list = finalstring.split(",")

    dict ={}
    for i in list:
            #Get Key Value pairs separately to store in dictionary
        keyvalue = i.split(":")

            #Replacing the single quotes in the leading.
        m= keyvalue[0].strip('\'')
        m = m.replace("\"", "")
        m = m.replace("\'", "")
        m = m.replace("'", "")
        m = m.replace('\n', '')
        m = m.replace("\n\n", '')
        dict[m] = keyvalue[1].strip('"\'').strip('\n\n"').strip("'")
    return dict

getAdminNotifs(120)